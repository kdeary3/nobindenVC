package nobinden.vc.application;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.NoSuchElementException;


import java.util.List;

@RestController
@RequestMapping("/api/v1/application")
public class ApplicationController {

    private final ApplicationService applicationService;

    public ApplicationController(ApplicationService applicationService) {
        this.applicationService = applicationService;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Application saveNewApplication(@RequestBody Application application) {
        return applicationService.saveApplication(application);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Application> findApplicationById(@PathVariable Long id) {
        try {
            Application application = applicationService.findApplicationById(id);
            return ResponseEntity.ok(application);
        } catch (NoSuchElementException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping
    public List<Application> getApplications() {
        return applicationService.findAllApplications();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteApplicationById(@PathVariable Long id) {
        try {
            applicationService.deleteApplicationById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (NoSuchElementException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<Application> updateStatus(@PathVariable Long id, @RequestBody Map<String, String> body) {
        try {
            String newStatus = body.get("status");
            // Delegate to service instead of repository
            Application updatedApp = applicationService.updateApplicationStatus(id, newStatus);
            return ResponseEntity.ok(updatedApp);
        } catch (NoSuchElementException e) {
            return ResponseEntity.notFound().build();
        }
    }

}
