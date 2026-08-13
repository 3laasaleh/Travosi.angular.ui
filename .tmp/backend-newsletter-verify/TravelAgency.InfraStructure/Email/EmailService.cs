using MailKit.Security;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using MimeKit;
using MimeKit.Utils;
using TravelAgency.Application.Common.Interfaces;
using TravelAgency.Application.Common.Logging;


namespace TravelAgency.InfraStructure.Email
{
    public class EmailService : IEmailService
    {
        private readonly ILogger<EmailService> _logger;
        private const string ApplicationName = "Sea World Holidays";
        private readonly IConfiguration _configuration;


        public EmailService(IConfiguration configuration, ILogger<EmailService> logger)
        {
            _logger = logger;
            _configuration = configuration;
        }

        private string GenerateAngularResetLink(string token, string email)
        {
            // Assuming your Angular app is hosted at this URL
            var angularAppUrl = _configuration["Smtp:AppUrl"];
            return $"{angularAppUrl}?token={token}&email={email}";
        }
     
        private string GenerateActivationLink(string token, string email)
        {
            var url = _configuration["Smtp:AppUrl"];
            return $"{url}/account/activate?email={Uri.EscapeDataString(email)}&token={Uri.EscapeDataString(token)}";
        }
        private string LoadTemplate(string fileName)
        {
            var path = Path.Combine(
                AppContext.BaseDirectory,
                "Email",
                "Templates",
                fileName);

            return File.ReadAllText(path);
        }
        public async Task SendActivateAccountEmailAsync(string toEmail, string token)
        {
            try
            {
                 int.TryParse(_configuration["Smtp:Port"], out int port) ;
                _logger.LogInformation(
                    "Sending account-activation email to {Recipient}",
                    toEmail);
                var email = _configuration["Smtp:AppEmail"];
                var password = _configuration["Smtp:AppPassword"];
                var emailMessage = new MimeMessage();
                emailMessage.From.Add(new MailboxAddress(ApplicationName, email)); // You can use your email here
                emailMessage.To.Add(new MailboxAddress("", toEmail));
                emailMessage.Subject = "Sea World Holidays Activate Account";
                var html = LoadTemplate("ActivateAccount.html");
                html = html.Replace("{{UserName}}", toEmail);
                var activationLink = GenerateActivationLink(token, toEmail);
                html = html.Replace("{{ActivationLink}}", activationLink);
                var builder = new BodyBuilder();
                var logo = await builder.LinkedResources.AddAsync(Path.Combine(
                AppContext.BaseDirectory,
                "Email",
                "Templates",
                "main-logo.png"));
                logo.ContentId = MimeUtils.GenerateMessageId();
                builder.HtmlBody = html.Replace("{{LogoContentId}}", logo.ContentId);
                builder.TextBody = $"Activate your Sea World Holidays account: {activationLink}";
                emailMessage.Body = builder.ToMessageBody();
                using (var client = new MailKit.Net.Smtp.SmtpClient())
                {
                    var host = _configuration["Smtp:Host"];
                    await client.ConnectAsync(host, port, SecureSocketOptions.SslOnConnect);
                    await client.AuthenticateAsync(email, password);
                   var res= await client.SendAsync(emailMessage);
                    await client.DisconnectAsync(true);
                }
            }
            catch (Exception e)
            {
                if (ExceptionLogState.TryMarkLogged(e))
                {
                    _logger.LogError(
                        e,
                        "Failed to send account-activation email to {Recipient}",
                        toEmail);
                }
                throw;
            }
        }
        public async Task SendResetPassWordEmailAsync(string toEmail, string token)
        {

            try
            {
                _logger.LogInformation(
                    "Sending password-reset email to {Recipient}",
                    toEmail);
                var email = _configuration["Smtp:AppEmail"];
                var password = _configuration["Smtp:AppPassword"];
                string message = $"Please reset your password by clicking here: {GenerateAngularResetLink(token, toEmail)}";
                var emailMessage = new MimeMessage();
                emailMessage.From.Add(new MailboxAddress(ApplicationName, email)); // You can use your email here
                emailMessage.To.Add(new MailboxAddress("", toEmail));
                emailMessage.Subject = "Sea World Holidays Reset Password";
                emailMessage.Body = new TextPart("plain") { Text = message };
                using (var client = new MailKit.Net.Smtp.SmtpClient())
                {
                    await client.ConnectAsync(_configuration["Smtp:Host"], int.Parse(_configuration["Smtp:Port"]), SecureSocketOptions.StartTls);
                    await client.AuthenticateAsync(email, password);
                    await client.SendAsync(emailMessage);
                    await client.DisconnectAsync(true);
                }
            }
            catch (Exception e)
            {
                if (ExceptionLogState.TryMarkLogged(e))
                {
                    _logger.LogError(
                        e,
                        "Failed to send password-reset email to {Recipient}",
                        toEmail);
                }
                throw;
            }
        }

        public async Task SendNewsletterWelcomeEmailAsync(
            string toEmail,
            CancellationToken cancellationToken = default)
        {
            try
            {
                _logger.LogInformation(
                    "Sending newsletter welcome email to {Recipient}",
                    toEmail);

                var senderEmail = RequiredSetting("Smtp:AppEmail");
                var password = RequiredSetting("Smtp:AppPassword");
                var host = RequiredSetting("Smtp:Host");
                if (!int.TryParse(RequiredSetting("Smtp:Port"), out var port))
                    throw new InvalidOperationException("Smtp:Port must be a valid number.");

                var message = new MimeMessage();
                message.From.Add(new MailboxAddress(ApplicationName, senderEmail));
                message.To.Add(MailboxAddress.Parse(toEmail));
                message.Subject = "Welcome to Sea World Holidays";

                var builder = new BodyBuilder();
                var logo = await builder.LinkedResources.AddAsync(
                    Path.Combine(
                        AppContext.BaseDirectory,
                        "Email",
                        "Templates",
                        "main-logo.png"),
                    cancellationToken);
                logo.ContentId = MimeUtils.GenerateMessageId();

                builder.HtmlBody = LoadTemplate("NewsletterWelcome.html")
                    .Replace("{{LogoContentId}}", logo.ContentId);
                builder.TextBody =
                    "Welcome to Sea World Holidays. Your newsletter subscription was completed successfully. " +
                    "You will receive our latest offers, new tours, and holiday packages.";
                message.Body = builder.ToMessageBody();

                using var client = new MailKit.Net.Smtp.SmtpClient();
                await client.ConnectAsync(
                    host,
                    port,
                    GetSocketOptions(),
                    cancellationToken);
                await client.AuthenticateAsync(senderEmail, password, cancellationToken);
                await client.SendAsync(message, cancellationToken);
                await client.DisconnectAsync(true, cancellationToken);
            }
            catch (Exception exception)
            {
                if (ExceptionLogState.TryMarkLogged(exception))
                {
                    _logger.LogError(
                        exception,
                        "Failed to send newsletter welcome email to {Recipient}",
                        toEmail);
                }
                throw;
            }
        }

        private string RequiredSetting(string key)
            => _configuration[key]
                ?? throw new InvalidOperationException($"The configuration value '{key}' is required.");

        private SecureSocketOptions GetSocketOptions()
        {
            var configured = _configuration["Smtp:Security"];
            if (Enum.TryParse<SecureSocketOptions>(configured, true, out var parsed))
                return parsed;

            return string.Equals(_configuration["Smtp:Port"], "465", StringComparison.Ordinal)
                ? SecureSocketOptions.SslOnConnect
                : SecureSocketOptions.StartTls;
        }
    }
}
