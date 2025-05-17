package org.example.electrostock.services;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EmailService {

    private final JavaMailSender mailSender;

    public void sendHtmlRegistrationEmail(String toEmail, String fullName) throws MessagingException {
        String subject = "Успішна реєстрація на ElectroStock";
        String htmlContent = generateHtmlContent(fullName);

        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

        helper.setFrom("facebookproject@ukr.net");
        helper.setTo(toEmail);
        helper.setSubject(subject);
        helper.setText(htmlContent, true);

        mailSender.send(message);
    }

    private String generateHtmlContent(String fullName) {
        return """
        <html>
          <body style="font-family: Arial, sans-serif; background-color: #f9f9f9; padding: 20px;">
            <div style="background-color: #ffffff; padding: 20px; border-radius: 10px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
              <h2 style="color: #C39964;">Hello, %s! 👋</h2>
              <p>Welcome to <strong>ElectroStock</strong>! 🎉</p>
              <p>Your registration has been completed <strong>successfully</strong>. You can now enjoy all the benefits of our service.</p>
              <br/>
              <p style="color: #555555;">Best regards,<br/><em style="color: #C39964;">The ElectroStock Team</em></p>
            </div>
          </body>
        </html>
        """.formatted(fullName);
    }
}
