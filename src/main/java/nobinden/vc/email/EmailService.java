package nobinden.vc.email;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import nobinden.vc.application.Application;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    private static final Logger log = LoggerFactory.getLogger(EmailService.class);

    private final JavaMailSender mailSender;

    @Value("${notification.recipient}")
    private String recipient;

    @Value("${spring.mail.username:}")
    private String fromAddress;

    public EmailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    public void sendNewApplicationNotification(Application app) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true);

            helper.setFrom(fromAddress);
            helper.setTo(recipient);
            helper.setSubject("New application: " + app.getName());

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

            helper.setText(body);

            if (app.getDeckFile() != null && app.getDeckFile().length > 0) {
                String filename = app.getDeckFilename() != null
                        ? app.getDeckFilename()
                        : "deck.pdf";
                helper.addAttachment(filename, new ByteArrayResource(app.getDeckFile()));
            }

            mailSender.send(message);
            log.info("Sent application notification email for {}", app.getName());
        } catch (MessagingException e) {
            log.error("Failed to send application notification email", e);
        }
    }
}