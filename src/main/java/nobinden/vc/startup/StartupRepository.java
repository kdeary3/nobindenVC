package nobinden.vc.startup;

import nobinden.vc.partner.Partner;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface StartupRepository extends JpaRepository<Startup, Long> {
    Optional<Startup> findByPartner(Partner partner);
}
