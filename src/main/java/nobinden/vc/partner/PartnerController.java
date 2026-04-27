package nobinden.vc.partner;

import nobinden.vc.startup.Startup;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

public class PartnerController {



//    @GetMapping("/startup/{startupPartner}")
//    public ResponseEntity<Startup> getStartupByPathVariable(@PathVariable("startupPartner") Partner partner) {
//        return partnerService.findStartupByPartner(partner)
//                .map(ResponseEntity::ok)
//                .orElseGet(() -> ResponseEntity.notFound().build());
//    }
}
