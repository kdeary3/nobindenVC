package nobinden.vc.startup;

import nobinden.vc.partner.Partner;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class StartupService {

    private final StartupRepository startupRepository;

    public StartupService(StartupRepository startupRepository) {
        this.startupRepository = startupRepository;
    }

    public Startup saveStartup(Startup startup) {
        return startupRepository.save(startup);
    }

    public List<Startup> saveAllStartups(List<Startup> startups) {
        return startupRepository.saveAll(startups);
    }

    public Startup findStartupById(Long id) {
        return startupRepository.findById(id).orElseThrow();
    }

    public List<Startup> findAllStartups() {
        return startupRepository.findAll();
    }

    public void deleteStartupById(Long id) {
        startupRepository.deleteById(id);  // Just this. No try-catch needed.
    }
}
