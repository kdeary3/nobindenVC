package nobinden.vc.application;

import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
public class Application {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String sector;

    @ElementCollection
    @CollectionTable(name = "application_founders", joinColumns = @JoinColumn(name = "application_id"))
    @Column(name = "founder_name")
    private List<String> founders = new ArrayList<>();

    private String founderEmail;
    private String founderPhoneNumber;
    private String targetRound;
    private String deckUrl;
    private String additionalComments;
    private String status;

    private LocalDateTime submittedAt;
    @PrePersist
    protected void onSubmit() {
        this.submittedAt = LocalDateTime.now();
        this.status = "Pending";
    }

    protected Application() {}

    public Application(String name, String sector, List<String> founders, String founderEmail, String founderPhoneNumber, String targetRound, String deckUrl, String additionalComments) {
        this.name = name;
        this.sector = sector;
        this.founders = founders;
        this.founderEmail = founderEmail;
        this.founderPhoneNumber = founderPhoneNumber;
        this.targetRound = targetRound;
        this.deckUrl = deckUrl;
        this.additionalComments = additionalComments;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSector() {
        return sector;
    }

    public void setSector(String sector) {
        this.sector = sector;
    }

    public List<String> getFounders() {
        return founders;
    }

    public void setFounders(List<String> founders) {
        this.founders = founders;
    }

    public String getFounderEmail() {
        return founderEmail;
    }

    public void setFounderEmail(String founderEmail) {
        this.founderEmail = founderEmail;
    }

    public String getFounderPhoneNumber() {
        return founderPhoneNumber;
    }

    public void setFounderPhoneNumber(String founderPhoneNumber) {
        this.founderPhoneNumber = founderPhoneNumber;
    }

    public String getTargetRound() {
        return targetRound;
    }

    public void setTargetRound(String targetRound) {
        this.targetRound = targetRound;
    }

    public String getDeckUrl() {
        return deckUrl;
    }

    public void setDeckUrl(String deckUrl) {
        this.deckUrl = deckUrl;
    }

    public String getAdditionalComments() {
        return additionalComments;
    }

    public void setAdditionalComments(String additionalComments) {
        this.additionalComments = additionalComments;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public LocalDateTime getSubmittedAt() {
        return submittedAt;
    }

    public void setSubmittedAt(LocalDateTime submittedAt) {
        this.submittedAt = submittedAt;
    }
}
