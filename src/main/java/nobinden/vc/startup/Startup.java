package nobinden.vc.startup;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import nobinden.vc.application.Application;
import org.springframework.format.annotation.DateTimeFormat;
import jakarta.persistence.*;
import nobinden.vc.partner.Partner;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Entity
public class Startup {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String sector;
    private String series;
    private Double eval;
    private Double equity;

    @JsonProperty("funds_accrued")
    @Column(name = "funds_accrued")
    private Double fundsAccrued;

    @JsonProperty("projected_close")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate projectedClose;

    private String stage;

    @ManyToOne
    @JoinColumn(name = "partner_id")
    private Partner partner;

    @ElementCollection
    @CollectionTable(name = "startup_founders", joinColumns = @JoinColumn(name = "startup_id"))
    @Column(name = "founder_name")
    private List<String> founders = new ArrayList<>();

    @ElementCollection
    @CollectionTable(name = "funding_by_round", joinColumns = @JoinColumn(name = "startup_id"))
    @MapKeyColumn(name = "round_name")
    @Column(name = "amount")
    private Map<String, Double> fundingByRound = new HashMap<>();

    @ElementCollection
    @CollectionTable(name = "startup_notes", joinColumns = @JoinColumn(name = "startup_id"))
    @Column(name = "startup_notes")
    private List<String> startupNotes = new ArrayList<>();

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "application_id")
    @JsonIgnore
    private Application application;

    public Startup() {}

    public Startup(String name, String sector, String series, List<String> founders, Map<String, Double> funding_by_round, Partner partner) {
        this.name = name;
        this.sector = sector;
        this.series = series;
        this.founders = founders;
        this.fundingByRound = funding_by_round;
        this.partner = partner;
    }

    public Startup(String name, String sector, String series, Double eval, Double equity, Double fundsAccrued, LocalDate projectedClose, String stage, Partner partner, List<String> founders, Map<String, Double> fundingByRound, List<String> startupNotes) {
        this.name = name;
        this.sector = sector;
        this.series = series;
        this.eval = eval;
        this.equity = equity;
        this.fundsAccrued = fundsAccrued;
        this.projectedClose = projectedClose;
        this.stage = stage;
        this.partner = partner;
        this.founders = founders;
        this.fundingByRound = fundingByRound;
        this.startupNotes = startupNotes;
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

    public String getSeries() {
        return series;
    }

    public void setSeries(String series) {
        this.series = series;
    }

    public List<String> getFounders() {
        return founders;
    }

    public void setFounders(List<String> founders) {
        this.founders = founders;
    }

    public Map<String, Double> getFundingByRound() {
        return fundingByRound;
    }

    public void setFundingByRound(Map<String, Double> fundingByRound) {
        this.fundingByRound = fundingByRound;
    }

    public Partner getPartner() {
        return partner;
    }

    public void setPartner(Partner partner) {
        this.partner = partner;
    }

    public Double getEval() {
        return eval;
    }

    public void setEval(Double eval) {
        this.eval = eval;
    }

    public Double getEquity() {
        return equity;
    }

    public void setEquity(Double equity) {
        this.equity = equity;
    }

    public Double getFundsAccrued() {
        return fundsAccrued;
    }

    public void setFundsAccrued(Double fundsAccrued) {
        this.fundsAccrued = fundsAccrued;
    }

    public LocalDate getProjectedClose() {
        return projectedClose;
    }

    public void setProjectedClose(LocalDate projectedClose) {
        this.projectedClose = projectedClose;
    }

    public String getStage() {
        return stage;
    }

    public void setStage(String stage) {
        this.stage = stage;
    }

    public List<String> getStartupNotes() {
        return startupNotes;
    }

    public void setStartupNotes(List<String> startupNotes) {
        this.startupNotes = startupNotes;
    }

    public Application getApplication() {
        return application;
    }

    public void setApplication(Application application) {
        this.application = application;
    }

    public Long getApplicationId() {
        return application != null ? application.getId() : null;
    }
}
