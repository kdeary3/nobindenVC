package nobinden.vc.startup;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

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
        startupRepository.deleteById(id);
    }

    public Startup addStartupNote(Long id, String note) {
        Startup startup = startupRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("startup not found"));
        startup.getStartupNotes().add(note);
        return startupRepository.save(startup);
    }

    public Startup deleteStartupNote(Long id, String note) {
        Startup startup = startupRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("startup not found"));
        boolean removed = startup.getStartupNotes().remove(note);
        if (!removed) {
            throw new NoSuchElementException("note not found");
        }
        return startupRepository.save(startup);
    }
}
