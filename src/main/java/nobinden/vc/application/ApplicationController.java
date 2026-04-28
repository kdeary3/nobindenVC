package nobinden.vc.application;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.NoSuchElementException;


import java.util.List;

@RestController
@RequestMapping("/api/v1/startup/application")
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

    @DeleteMapping
    public ResponseEntity<Application> deleteApplicationById(@PathVariable Long id) {
        try {
            applicationService.deleteApplicationById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (NoSuchElementException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

}
