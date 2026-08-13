using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using TravelAgency.Application.Common.Interfaces;
using TravelAgency.Domain.Repositories;
using TravelAgency.InfraStructure.Authentication;
using TravelAgency.InfraStructure.Email;
using TravelAgency.InfraStructure.Persistence;
using TravelAgency.InfraStructure.Repositories;

namespace TravelAgency.InfraStructure
{
    public static class ConfigureService
    {

        public static void AddRepositories(this IServiceCollection services) {
           services.AddScoped(typeof(IGenericRepository<>), typeof(GenericRepository<>));
            services.AddScoped<IUnitOfWork, UnitOfWork>();
            services.AddScoped<IUserRepository, UserRepository>();
            services.AddScoped<IWebsiteVisitorRepository, WebsiteVisitorRepository>();
            services.AddScoped<INewsletterSubscriptionRepository, NewsletterSubscriptionRepository>();

        }
        public static void AddInfrastructureServices(this IServiceCollection services)
        {
            services.AddSingleton<IJwtTokenGenerator, JwtTokenGenerator>();
            services.AddSingleton<IEmailService, EmailService>();
        }


     
        public static void AddSqlContext(this IServiceCollection services, string connectionString) {
            services.AddDbContext<TravelAgencyContext>((sp, options) =>
        {
             options.UseSqlServer(connectionString);
  
         options.LogTo(Console.WriteLine, Microsoft.Extensions.Logging.LogLevel.Information);
        });

        }

   
    }
}
