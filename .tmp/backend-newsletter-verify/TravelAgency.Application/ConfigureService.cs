using FluentValidation;
using Microsoft.Extensions.DependencyInjection;
using TravelAgency.Application.Interfaces;
using TravelAgency.Application.Services;
using TravelAgency.Application.Validators;

namespace TravelAgency.Application
{
    public static class ConfigureService
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services)
        {
            services.AddScoped<IAboutUsService, AboutUsService>();
            services.AddScoped<IDestinationService, DestinationService>();
            services.AddScoped<IBlogService, BlogService>();
            services.AddScoped<INewsletterSubscriptionService, NewsletterSubscriptionService>();
            services.AddScoped<ITourService, TourService>();
            services.AddScoped<IPackageService, PackageService>();
            services.AddScoped<ICurrencyService, CurrencyService>();
            services.AddScoped<IBookingService, BookingService>();
            services.AddScoped<ITourHighlightService, TourHighlightService>();
            services.AddScoped<ITourIncludeService, TourIncludeService>();
  
            services.AddScoped<IReviewService, ReviewService>();

            services.AddScoped<IHotelService, HotelService>();
            services.AddScoped<IHotelRoomService, HotelRoomService>();
            services.AddScoped<IAirlineService, AirlineService>();
            services.AddScoped<IFlightService, FlightService>();
            services.AddScoped<ICityService, CityService>();
            services.AddScoped<ICustomerService, CustomerService>();
            services.AddScoped<ITravelerService, TravelerService>();
            services.AddScoped<IQuotationService, QuotationService>();
            services.AddScoped<IInvoiceService, InvoiceService>();
            services.AddScoped<IVoucherService, VoucherService>();
            services.AddScoped<INotificationService, NotificationService>();
            services.AddScoped<ITaskService, TaskService>();

            services.AddValidatorsFromAssemblyContaining<CreateDestinationDTOValidator>(ServiceLifetime.Scoped);

            return services;
        }
    }
}
