using AutoMapper;
using System;
using System.Collections.Generic;
using System.Text;
using TravelAgency.Application.DTOs;
using TravelAgency.Application.DTOs.Bookings;
using TravelAgency.Application.DTOs.Blogs;
using TravelAgency.Application.DTOs.Crm;
using TravelAgency.Application.DTOs.Destinations;
using TravelAgency.Application.DTOs.Geography;
using TravelAgency.Application.DTOs.Hotels;
using TravelAgency.Application.DTOs.Notifications;
using TravelAgency.Application.DTOs.Packages;
using TravelAgency.Application.DTOs.Quotations;
using TravelAgency.Application.DTOs.Tasks;
using TravelAgency.Application.DTOs.Tour;
using TravelAgency.Application.DTOs.Tours;
using TravelAgency.Application.DTOs.Transport;
using TravelAgency.Application.DTOs.User;
using TravelAgency.Domain.Entities;

namespace TravelAgency.Application.Mapping
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {

            CreateMap<DestinationImage, ImageDTO>().ReverseMap();
            CreateMap<TourImage, ImageDTO>().ReverseMap();
            CreateMap<PackageImage, ImageDTO>().ReverseMap();
            CreateMap<BlogImage, ImageDTO>().ReverseMap();

            CreateMap<User, UserRegisterationDTO>().ReverseMap();
            CreateMap<User, UserDTO>().ReverseMap();
            CreateMap<User, UserLoginDTO>()
                .ForMember(m => m.UserId, d => d.MapFrom(s => s.Id))    
                .ReverseMap();
            CreateMap<User, AgentListItemDTO>();

            CreateMap<Destination, DestinationDTO>();
            CreateMap<City, DestinationCityDTO>();
            CreateMap<CreateDestinationDTO, Destination>()
                .ForMember(m => m.Images,s=>s.Ignore());
            CreateMap<UpdateDestinationDTO, Destination>()
                .ForMember(m => m.Images, d => d.MapFrom(s => new List<DestinationImage>()));

            CreateMap<Blog, BlogDTO>();
            CreateMap<CreateBlogDTO, Blog>()
                .ForMember(m => m.Images, d => d.Ignore())
                .ForMember(m => m.IsActive, d => d.Ignore())
                .ForMember(m => m.PublishedAt, d => d.Ignore());
            CreateMap<UpdateBlogDTO, Blog>()
                .ForMember(m => m.Images, d => d.Ignore())
                .ForMember(m => m.IsActive, d => d.Ignore())
                .ForMember(m => m.PublishedAt, d => d.Ignore());
            CreateMap<CreateTourDTO, Tour>();

            CreateMap<TourInclude, TourIncludeDTO>().ReverseMap(); ;
            CreateMap<TourExclude, TourExcludeDTO>().ReverseMap(); ;
            CreateMap<TourHighlight, TourHighlightDTO>().ReverseMap();    


         
            CreateMap<TourItinerary, TourItineraryDTO>();

            CreateMap<Tour, TourHomeDTO>()
                   .ForMember(m => m.DestinationName, d => d.MapFrom(s => s.Destination != null ? s.Destination.NameEng : null))
                   .ForMember(m => m.CityName, d => d.MapFrom(s => s.City != null ? s.City.NameEng : null));
            CreateMap<Tour, TourDTO>()
                .ForMember(m => m.DestinationName, d => d.MapFrom(s => s.Destination != null ? s.Destination.NameEng : null))
                .ForMember(m => m.CityName, d => d.MapFrom(s => s.City != null ? s.City.NameEng : null))
                .ForMember(m => m.Itinerary, d => d.Ignore());
            CreateMap<CreateTourDTO, Tour>()
                .ForMember(m => m.Itinerary, d => d.Ignore());
            CreateMap<UpdateTourDTO, Tour>()
                .ForMember(m => m.Itinerary, d => d.Ignore())
                .ForMember(m => m.Includes, d => d.Ignore())
                .ForMember(m => m.Excludes, d => d.Ignore())
                .ForMember(m => m.Highlights, d => d.Ignore())
                ;

            CreateMap<Booking, BookingDTO>()
                .ForMember(m => m.UserName, d => d.MapFrom(s => s.User != null ? s.User.FirstName + " " + s.User.LastName : null))
                .ForMember(m => m.UserMobile, d => d.MapFrom(s => s.User != null ? s.User.Mobile : null))
                .ForMember(m => m.TourTitle, d => d.MapFrom(s => s.Tour != null ? s.Tour.TitleEng : null))
                .ForMember(m => m.PackageName, d => d.MapFrom(s => s.Package != null ? s.Package.NameEng : null))
                .ForMember(m => m.AgentName, d => d.MapFrom(s => s.Agent != null ? s.Agent.FirstName + " " + s.Agent.LastName : null))
                .ForMember(m => m.IsFreeCancellation, d => d.MapFrom(s =>
                    s.Tour != null ? s.Tour.IsFreeCancelation : s.Package != null && s.Package.IsFreeCancelation));
            CreateMap<CreateBookingDTO, Booking>();

            // Hotels
            CreateMap<Hotel, HotelDTO>()
                .ForMember(m => m.DestinationName, d => d.MapFrom(s => s.Destination != null ? s.Destination.NameEng : null));
            CreateMap<CreateHotelDTO, Hotel>();
            CreateMap<UpdateHotelDTO, Hotel>();
            CreateMap<HotelRoom, HotelRoomDTO>();
            CreateMap<CreateHotelRoomDTO, HotelRoom>();
            CreateMap<UpdateHotelRoomDTO, HotelRoom>();

            // Transport
            CreateMap<Airline, AirlineDTO>();
            CreateMap<CreateAirlineDTO, Airline>();
            CreateMap<UpdateAirlineDTO, Airline>();
            CreateMap<Flight, FlightDTO>()
                .ForMember(m => m.AirlineName, d => d.MapFrom(s => s.Airline != null ? s.Airline.Name : null));
            CreateMap<CreateFlightDTO, Flight>();
            CreateMap<UpdateFlightDTO, Flight>();

            // Geography
            CreateMap<City, CityDTO>()
                .ForMember(m => m.DestinationNameEng, d => d.MapFrom(s => s.Destination != null ? s.Destination.NameEng : null))
                .ForMember(m => m.DestinationNameAr, d => d.MapFrom(s => s.Destination != null ? s.Destination.NameAr : null));
            CreateMap<City, CityDetailsDTO>()
                .ForMember(m => m.DestinationNameEng, d => d.MapFrom(s => s.Destination != null ? s.Destination.NameEng : null))
                .ForMember(m => m.DestinationNameAr, d => d.MapFrom(s => s.Destination != null ? s.Destination.NameAr : null))
                .ForMember(m => m.TopTours, d => d.Ignore());
            CreateMap<CreateCityDTO, City>();
            CreateMap<UpdateCityDTO, City>();

            // CRM
            CreateMap<Customer, CustomerDTO>()
                .ForMember(m => m.AgentName, d => d.MapFrom(s => s.Agent != null ? s.Agent.FirstName + " " + s.Agent.LastName : null));
            CreateMap<CreateCustomerDTO, Customer>()
                .ForMember(m => m.Travelers, d => d.Ignore())
                .ForMember(m => m.Agent, d => d.Ignore());
            CreateMap<UpdateCustomerDTO, Customer>()
                .ForMember(m => m.Travelers, d => d.Ignore())
                .ForMember(m => m.Agent, d => d.Ignore());
            CreateMap<Traveler, TravelerDTO>();
            CreateMap<CustomerTravelerInputDTO, Traveler>();
            CreateMap<CreateTravelerDTO, Traveler>();
            CreateMap<UpdateTravelerDTO, Traveler>();

            // Quotations
            CreateMap<Quotation, QuotationDTO>()
                .ForMember(m => m.CustomerName, d => d.MapFrom(s => s.Customer != null
                    ? (s.Customer.CompanyName ?? (s.Customer.FirstName + " " + s.Customer.LastName)) : null))
                .ForMember(m => m.CustomerEmail, d => d.MapFrom(s => s.Customer != null ? s.Customer.Email : null))
                .ForMember(m => m.CustomerMobile, d => d.MapFrom(s => s.Customer != null ? s.Customer.Mobile : null))
                .ForMember(m => m.CustomerTypeName, d => d.MapFrom(s => s.Customer != null ? s.Customer.CustomerType.ToString() : null))
                .ForMember(m => m.CompanyName, d => d.MapFrom(s => s.Customer != null ? s.Customer.CompanyName : null))
                .ForMember(m => m.SalesAgentName, d => d.MapFrom(s => s.SalesAgent != null ? s.SalesAgent.FirstName + " " + s.SalesAgent.LastName : null))
                .ForMember(m => m.CurrencySign, d => d.MapFrom(s => s.Currency != null ? s.Currency.Sign : null));
            CreateMap<QuotationItem, QuotationItemDTO>();
            CreateMap<CreateQuotationItemDTO, QuotationItem>();
            CreateMap<CreateQuotationDTO, Quotation>()
                .ForMember(m => m.Items, d => d.Ignore());
            CreateMap<UpdateQuotationDTO, Quotation>()
                .ForMember(m => m.Items, d => d.Ignore());

            // Tasks
            CreateMap<AgentTask, AgentTaskDTO>()
                .ForMember(m => m.AssignedToAgentName, d => d.MapFrom(s => s.AssignedToAgent != null ? s.AssignedToAgent.FirstName + " " + s.AssignedToAgent.LastName : null))
                .ForMember(m => m.CreatedByAdminName, d => d.MapFrom(s => s.CreatedByAdmin != null ? s.CreatedByAdmin.FirstName + " " + s.CreatedByAdmin.LastName : null));
            CreateMap<CreateAgentTaskDTO, AgentTask>();
            CreateMap<UpdateAgentTaskDTO, AgentTask>()
                .ForMember(m => m.Status, d => d.Ignore());

            // Notifications
            CreateMap<Notification, NotificationDTO>();

            // Packages
            CreateMap<PackageItinerary, PackageItineraryDTO>();
            CreateMap<PackageDestination, PackageDestinationDTO>()
                .ForMember(m => m.DestinationName, d => d.MapFrom(s => s.Destination != null ? s.Destination.NameEng : null));
            CreateMap<Package, PackageDTO>()
                .ForMember(m => m.Destinations, d => d.MapFrom(s => s.PackageDestination))
                .ForMember(m => m.BookingsCount, d => d.MapFrom(s => s.Bookings.Count))
                .ForMember(m => m.Itinerary, d => d.Ignore());
            CreateMap<CreatePackageDTO, Package>()
                .ForMember(m => m.Itinerary, d => d.Ignore())
                .ForMember(m => m.Images, d => d.Ignore())
                .ForMember(m => m.PackageDestination, d => d.Ignore())
                .ForMember(m => m.Bookings, d => d.Ignore());
            CreateMap<UpdatePackageDTO, Package>()
                .ForMember(m => m.Itinerary, d => d.Ignore())
                .ForMember(m => m.Images, d => d.Ignore())
                .ForMember(m => m.PackageDestination, d => d.Ignore())
                .ForMember(m => m.Bookings, d => d.Ignore());
        }
    }
}
