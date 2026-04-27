package nobinden.vc.partner;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.data.jpa.test.autoconfigure.DataJpaTest;

import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
class PartnerRepositoryTest {

    @Autowired
    private PartnerRepository partnerRepository;

    @Test
    void findPartnerById() {
        // ARRANGE
        Partner partner = new Partner("Keno Deary", "General Partner");

        partnerRepository.save(partner);
        var found = partnerRepository.findById(partner.getId());

        // ASSERT
        assertThat(found).isPresent();
        assertThat(found.get().getId()).isEqualTo(partner.getId());
    }

}