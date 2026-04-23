package nobinden.vc.startup;

import nobinden.vc.partner.Partner;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
\import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class StartupServiceTest {

    @Mock
    private StartupRepository startupRepository;

    @InjectMocks
    private StartupService startupService;

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

        startups.addAll(List.of(google, stripe));
    }

    @Test
    void shouldSaveNewStartup() {
        // ACT
        when(startupRepository.save(google)).thenReturn(google);
        Startup result = startupService.saveStartup(google);

        // ASSERT
        assertThat(result.getId()).isEqualTo(google.getId());
        assertThat(result.getName()).isEqualTo("Google");
        assertThat(result.getSector()).isEqualTo("Tech");
        assertThat(result.getSeries()).isEqualTo("Series A");

        verify(startupRepository, only()).save(google);
    }

    @Test
    void shouldGetAllStartups() {
        when(startupRepository.findAll()).thenReturn(startups);
        List<Startup> results = startupService.findAllStartups();

        verify(startupRepository, only()).findAll();
        assertThat(results).isEqualTo(startups);
    }

    @Test
    void shouldFindStartupById() {
        when(startupRepository.findById(1L)).thenReturn(Optional.of(google));
        Startup result = startupService.findStartupById(1L);

        verify(startupRepository, only()).findById(1L);
        assertThat(result).isEqualTo(google);
    }

    @Test
    void shouldSaveAllStartups() {
        when(startupRepository.saveAll(startups)).thenReturn(startups);
        List<Startup> result = startupService.saveAllStartups(startups);

        verify(startupRepository, only()).saveAll(startups);
        assertThat(result).isEqualTo(startups);
    }

    @Test
    void shouldDeleteStartupById() {
        doNothing().when(startupRepository).deleteById(1L);
        startupService.deleteStartupById(1L);

        verify(startupRepository, only()).deleteById(1L);
    }
}