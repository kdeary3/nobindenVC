package nobinden.vc.startup;

import nobinden.vc.partner.Partner;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

public class StartupController {

    private final StartupService startupService;

    public StartupController(StartupService startupService) {
        this.startupService = startupService;
    }

    @PostMapping("/startup")
    @ResponseStatus(HttpStatus.CREATED)
    public Startup saveNewStartup(@RequestBody Startup startup) {
        return startupService.saveStartup(startup);
    }

    @GetMapping(value = "/startup")
    public List<Startup> getStartups() {
        return startupService.findAllStartups();
    }

    @GetMapping("/startup/{startupPartner}")
    public ResponseEntity<Startup> getStartupByPathVariable(@PathVariable("startupPartner") Partner partner) {
        return startupService.findStartupByPartner(partner)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping(value = "startup/id/", params = "id")
    public Optional<Startup> getStartupById(@RequestParam Long id) {
        return startupService.findStartupById(id);
    }
}
