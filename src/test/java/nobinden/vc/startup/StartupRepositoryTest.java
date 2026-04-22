package nobinden.vc.startup;

import nobinden.vc.partner.Partner;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.data.jpa.test.autoconfigure.DataJpaTest;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.List;
import java.util.Map;

@DataJpaTest
class StartupRepositoryTest {

    @Autowired
    private StartupRepository startupRepository;

    @Test
    void findStartupById() {
        // ARRANGE
        Partner partner = new Partner("Keno Deary", "General Partner");
        Startup google = new Startup(
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

        startupRepository.save(google);
        var found = startupRepository.findById(google.getId());
        google.setId(1L);

        // ASSERT
        assertThat(found).isPresent();
        assertThat(found.get().getId()).isEqualTo(1L);
        assertThat(found.get().getName()).isEqualTo("Google");
        assertThat(found.get().getSector()).isEqualTo("Tech");
        assertThat(found.get().getSeries()).isEqualTo("Series A");
        assertThat(found.get().getFounders()).containsExactly("Larry Page", "Sergey Brin");
        assertThat(found.get().getFundingByRound())
            .containsAllEntriesOf(Map.of(
                "Preseed", 100000.0,
                "Seed", 200000.0,
                "Series A", 0.0)
        );
        assertThat(found.get().getPartner()).isEqualTo(partner);

    }

}