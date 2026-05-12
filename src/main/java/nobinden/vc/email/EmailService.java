package nobinden.vc.email;

import com.resend.Resend;
import com.resend.core.exception.ResendException;
import com.resend.services.emails.model.Attachment;
import com.resend.services.emails.model.CreateEmailOptions;
import nobinden.vc.application.Application;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.Base64;
import java.util.List;

@Service
public class EmailService {

    private static final Logger log = LoggerFactory.getLogger(EmailService.class);

    @Value("${resend.api-key}")
    private String apiKey;

    @Value("${notification.recipient}")
    private String recipient;

    public void sendNewApplicationNotification(Application app) {
        if (apiKey == null || apiKey.isBlank()) {
            log.warn("Resend API key not configured, skipping email");
            return;
        }

        try {
            Resend resend = new Resend(apiKey);

            String body = String.format("""
                New application received.

                Company: %s
                Sector: %s
                Target Round: %s
                Founders: %s
                Email: %s
                Phone: %s

                Comments:
                %s

                View in dashboard: https://nobinden.com/partners/startup-applications
                """,
                    app.getName(),
                    app.getSector(),
                    app.getTargetRound(),
                    app.getFounders() != null ? String.join(", ", app.getFounders()) : "(none listed)",
                    app.getFounderEmail(),
                    app.getFounderPhoneNumber(),
                    app.getAdditionalComments() != null && !app.getAdditionalComments().isBlank()
                            ? app.getAdditionalComments()
                            : "(none)"
            );

            CreateEmailOptions.Builder optionsBuilder = CreateEmailOptions.builder()
                    .from("onboarding@resend.dev")
                    .to(recipient)
                    .subject("New application: " + app.getName())
                    .text(body);

            if (app.getDeckFile() != null && app.getDeckFile().length > 0) {
                String filename = app.getDeckFilename() != null ? app.getDeckFilename() : "deck.pdf";
                String base64Content = Base64.getEncoder().encodeToString(app.getDeckFile());
                Attachment attachment = Attachment.builder()
                        .fileName(filename)
                        .content(base64Content)
                        .build();
                optionsBuilder.attachments(List.of(attachment));
            }

            resend.emails().send(optionsBuilder.build());
            log.info("Sent application notification email for {}", app.getName());
        } catch (ResendException e) {
            log.error("Failed to send application notification email", e);
        }
    }
}