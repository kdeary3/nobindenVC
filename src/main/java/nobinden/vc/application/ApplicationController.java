package nobinden.vc.application;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
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

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @ResponseStatus(HttpStatus.CREATED)
    public Application saveNewApplicationWithDeck(
            @RequestPart("application") Application application,
            @RequestPart(value = "deck", required = false) MultipartFile deck) throws IOException {
        return applicationService.saveApplicationWithDeck(application, deck);
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

    @GetMapping("/{id}/deck")
    public ResponseEntity<byte[]> getDeck(@PathVariable Long id) {
        try {
            Application application = applicationService.findApplicationById(id);

            byte[] deckFile = application.getDeckFile();
            if (deckFile == null || deckFile.length == 0) {
                return ResponseEntity.notFound().build();
            }

            String filename = application.getDeckFilename() != null
                    ? application.getDeckFilename()
                    : "deck.pdf";
            String contentType = application.getDeckContentType() != null
                    ? application.getDeckContentType()
                    : MediaType.APPLICATION_PDF_VALUE;

            return ResponseEntity.ok()
                    .contentType(MediaType.parseMediaType(contentType))
                    .header(HttpHeaders.CONTENT_DISPOSITION,
                            "inline; filename=\"" + filename + "\"")
                    .body(deckFile);
        } catch (NoSuchElementException e) {
            return ResponseEntity.notFound().build();
        }
    }

}
