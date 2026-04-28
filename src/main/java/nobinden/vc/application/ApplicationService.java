package nobinden.vc.application;

import org.springframework.stereotype.Service;

import java.util.List;

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
        applicationRepository.deleteById(id);
    }

}
