package nobinden.vc.application;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

@Service
public class ApplicationService {

    private final ApplicationRepository applicationRepository;

    public ApplicationService(ApplicationRepository applicationRepository) {
        this.applicationRepository = applicationRepository;
    }

    public Application saveApplication(Application application) {
        return applicationRepository.save(application);
    }

    public List<Application> saveAllApplications(List<Application> applications) {
        return applicationRepository.saveAll(applications);
    }

    public Application findApplicationById(Long id) {
        return applicationRepository.findById(id).orElseThrow();
    }

    public List<Application> findAllApplications() {
        return applicationRepository.findAll();
    }

    public void deleteApplicationById(Long id) {
        if (!applicationRepository.existsById(id)) {
            throw new NoSuchElementException("Cannot delete: Application " + id + " not found");
        }
        applicationRepository.deleteById(id);
    }
    public Application updateApplicationStatus(Long id, String status) {
        Application app = applicationRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Application not found"));
        app.setStatus(status);
        return applicationRepository.save(app);
    }

}
