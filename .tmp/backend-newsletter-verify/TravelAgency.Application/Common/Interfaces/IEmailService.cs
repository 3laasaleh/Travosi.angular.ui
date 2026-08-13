using System;
using System.Collections.Generic;
using System.Text;

namespace TravelAgency.Application.Common.Interfaces
{
    public interface IEmailService
    {
        public  Task SendResetPassWordEmailAsync(string toEmail, string token);
        public  Task SendActivateAccountEmailAsync(string toEmail, string token);
        Task SendNewsletterWelcomeEmailAsync(
            string toEmail,
            CancellationToken cancellationToken = default);
    }
}
