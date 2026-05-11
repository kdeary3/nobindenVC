package nobinden.vc.startup;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.NoSuchElementException;

import java.util.List;

@RestController
@RequestMapping("/api/v1/startup")
public class StartupController {

    private final StartupService startupService;

    public StartupController(StartupService startupService) {
        this.startupService = startupService;
    }

    @PostMapping()
    @ResponseStatus(HttpStatus.CREATED)
    public Startup saveNewStartup(@RequestBody Startup startup) {
        return startupService.saveStartup(startup);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Startup> findStartupById(@PathVariable Long id) {
        try {
            Startup startup = startupService.findStartupById(id);
            return ResponseEntity.ok(startup);
        } catch (NoSuchElementException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping()
    public List<Startup> getStartups() {
        return startupService.findAllStartups();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Startup> deleteStartupById(@PathVariable Long id) {
        try {
            startupService.deleteStartupById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PatchMapping("/{id}/stage")
    public ResponseEntity<Startup> updateStartupStage(@PathVariable Long id, @RequestBody String stage) {
        try {
            Startup startup = startupService.findStartupById(id);
            startup.setStage(stage);
            return ResponseEntity.ok(startupService.saveStartup(startup));
        } catch (NoSuchElementException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/{id}/notes")
    public ResponseEntity<Startup> addStartupNote(@PathVariable Long id, @RequestBody Map<String, String> body) {
        try {
            String note = body.get("note");
            Startup updated = startupService.addStartupNote(id, note);
            return ResponseEntity.ok(updated);
        } catch (NoSuchElementException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}/notes")
    public ResponseEntity<Startup> deleteStartupNote(@PathVariable Long id, @RequestBody Map<String, String> body) {
        try {
            String note = body.get("note");
            Startup updated = startupService.deleteStartupNote(id, note);
            return ResponseEntity.ok(updated);
        } catch (NoSuchElementException e) {
            return ResponseEntity.notFound().build();
        }
    }

}