package nobinden.vc.application;

import nobinden.vc.email.EmailService;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.UUID;

@Service
public class ApplicationService {

    private final ApplicationRepository applicationRepository;
    private final EmailService emailService;
    private static final Logger log = LoggerFactory.getLogger(ApplicationService.class);


    public ApplicationService(ApplicationRepository applicationRepository, EmailService emailService) {
        this.applicationRepository = applicationRepository;
        this.emailService = emailService;
    }

    public Application saveApplicationWithDeck(Application application, MultipartFile deck) throws IOException {
        if (deck != null && !deck.isEmpty()) {
            application.setDeckFile(deck.getBytes());
            application.setDeckFilename(deck.getOriginalFilename());
            application.setDeckContentType(deck.getContentType());
        }
        Application saved = applicationRepository.save(application);

        try {
            emailService.sendNewApplicationNotification(saved);
        } catch (Exception e) {
            // Email failure should not block application submission
            log.error("Email send failed but application was saved", e);
        }

        return saved;
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
