package nobinden.vc.startup;

import nobinden.vc.partner.Partner;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;
import org.mockito.Captor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.webmvc.test.autoconfigure.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import tools.jackson.core.type.TypeReference;
import tools.jackson.databind.ObjectMapper;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.containsString;
import static org.hamcrest.Matchers.matchesPattern;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(StartupController.class)
class StartupControllerTest {

    @Autowired
    private MockMvc mockMvc;
    @Autowired
    private ObjectMapper objectMapper;

    @MockitoBean
    private StartupService startupService;

    @Captor
    ArgumentCaptor<Startup> captor =  ArgumentCaptor.forClass(Startup.class);

    Startup google;
    Startup stripe;

    List<Startup> startups = new ArrayList<>();

    @BeforeEach
    void init() {
        Partner partner = new Partner("Keno Deary", "General Partner");
        google = new Startup(
                "Google",
                "Tech",
                "Series A",
                List.of("Larry Page", "Sergey Brin"),
                Map.of(
                        "Preseed", 100000.0,
                        "Seed", 200000.0,
                        "Series A", 0.0
                ),
                partner
        );
        google.setId(1L);

        Partner partner2 = new Partner("Peter Thiel", "Partner");
        stripe = new Startup(
                "Stripe",
                "Fintech",
                "Series B",
                List.of("Patrick Collison", "John Collison"),
                Map.of(
                        "Preseed", 200000.0,
                        "Seed", 300000.0,
                        "Series A", 444000.0,
                        "Series B", 0.0
                ),
                partner2
        );
        stripe.setId(2L);

        when(startupService.saveStartup(any(Startup.class))).thenReturn(google);
    }

    @Test
    void shouldSaveNewStartup() throws Exception {
        // ACT
        mockMvc.perform(post("/api/v1/startup")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(google)))
            // results matchers
            .andExpect(status().isCreated())
            .andExpect(jsonPath("$.name").value(matchesPattern("Google")))
            .andExpect(jsonPath("$.sector").value(containsString("Tech")))
            .andExpect(jsonPath("$.partner.name").value("Keno Deary"))
            .andDo(print()
            );

        // ASSERT
        verify(startupService, times(1)).saveStartup(any(Startup.class));
    }

    @Test
    void shouldSaveNewStartupUsingCaptor() throws Exception {
        // ACT
        mockMvc.perform(post("/api/v1/startup")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(google)))
                // results matchers
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.name").value(matchesPattern("Google")))
                .andExpect(jsonPath("$.sector").value(containsString("Tech")))
                .andExpect(jsonPath("$.partner.name").value("Keno Deary"))
                .andDo(print()
                );

        verify(startupService, only()).saveStartup(captor.capture());
        assertThat(captor.getValue()).usingRecursiveComparison().isEqualTo(google);

        verify(startupService, only()).saveStartup(any(Startup.class));
    }

    @Test
    void shouldFindAllTasks() throws Exception {
        startups.addAll(List.of(google, stripe));

        when(startupService.findAllStartups()).thenReturn(startups);

        MvcResult results = mockMvc.perform(get("/api/v1/startup")
                    .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(2))
                .andReturn();

        // Deserialize JSON response into List<Startup>
        String jsonResponse = results.getResponse().getContentAsString();
        List<Startup> responseTasks = objectMapper.readValue(jsonResponse, new TypeReference<>() {});

        verify(startupService, times(1)).findAllStartups();
        verify(startupService, only()).findAllStartups();
    }

    @Test
    void shouldFindTaskById() throws Exception {
        when(startupService.findStartupById(2L)).thenReturn(stripe);

        String startupJson = objectMapper.writeValueAsString(stripe);

        mockMvc.perform(get("/api/v1/startup/2"))
                .andExpect(status().isOk())
                .andExpect(content().json(startupJson));

        verify(startupService, only()).findStartupById(2L);
    }

    @Test
    void shouldDeleteTaskById() throws Exception {
        mockMvc.perform(delete("/api/v1/startup/{id}", 1)
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(1L)))
                .andExpect(status().isNoContent())
                .andDo(print());

        verify(startupService, times(1)).deleteStartupById(1L);

    }
}