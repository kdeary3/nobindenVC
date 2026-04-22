package nobinden.vc.startup;

import jakarta.persistence.*;
import nobinden.vc.partner.Partner;

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

    @ElementCollection
    @CollectionTable(name="startup_founders", joinColumns = @JoinColumn(name = "startup_id"))
    @Column(name = "founder_name")
    private List<String> founders = new ArrayList<>();

    @ElementCollection
    @CollectionTable(name="funding_by_round", joinColumns = @JoinColumn(name = "startup_id"))
    @MapKeyColumn(name = "round_name")
    @Column(name = "amount")
    private Map<String, Double> fundingByRound = new HashMap<>();

    @ManyToOne
    @JoinColumn(name = "partner_id")
    private Partner partner;

    protected Startup() {}

    public Startup(String name, String sector, String series, List<String> founders, Map<String, Double> funding_by_round, Partner partner) {
        this.name = name;
        this.sector = sector;
        this.series = series;
        this.founders = founders;
        this.fundingByRound = funding_by_round;
        this.partner = partner;
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
}
