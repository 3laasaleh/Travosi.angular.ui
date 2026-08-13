using Microsoft.EntityFrameworkCore;
using Org.BouncyCastle.Utilities;
using TravelAgency.Domain.Entities;
using TravelAgency.Domain.Entities.Logger;
using TravelAgency.InfraStructure.Persistence.SeedData;
namespace TravelAgency.InfraStructure.Persistence
{
    public class TravelAgencyContext : DbContext
    {

        public TravelAgencyContext(DbContextOptions<TravelAgencyContext> options) : base(options)
        { 
        }

        #region Identity

        public DbSet<User> Users => Set<User>();

        #endregion

        #region Blogs

        public DbSet<Blog> Blogs => Set<Blog>();
        public DbSet<BlogImage> BlogImages => Set<BlogImage>();

        #endregion

        #region Logging

        public DbSet<Logg> Loggs => Set<Logg>();

        #endregion

        #region Geography

        public DbSet<City> Cities => Set<City>();
        public DbSet<Currency> Currencies => Set<Currency>();

        #endregion

        #region Destinations

        public DbSet<Destination> Destinations => Set<Destination>();
        public DbSet<DestinationImage> DestinationImages => Set<DestinationImage>();

        #endregion

        #region Tours

        public DbSet<Tour> Tours => Set<Tour>();
        public DbSet<TourImage> TourImages => Set<TourImage>();
        public DbSet<TourHighlight> TourHighlights => Set<TourHighlight>();
        public DbSet<TourInclude> TourIncludes => Set<TourInclude>();
        public DbSet<TourExclude> TourExcludes => Set<TourExclude>();
        public DbSet<TourItinerary> TourItineraries => Set<TourItinerary>();

        #endregion

        #region Packages

        public DbSet<Package> Packages => Set<Package>();
        public DbSet<PackageDestination> PackageDestinations => Set<PackageDestination>();
        public DbSet<PackageItinerary> PackageItineraries => Set<PackageItinerary>();
        public DbSet<PackageImage> PackageImages => Set<PackageImage>();

        #endregion

        #region Transportation

        public DbSet<Airline> Airlines => Set<Airline>();
        public DbSet<Flight> Flights => Set<Flight>();

        #endregion

        #region Accommodation

        public DbSet<Hotel> Hotels => Set<Hotel>();
        public DbSet<HotelRoom> HotelRooms => Set<HotelRoom>();

        #endregion

        #region CRM

        public DbSet<Customer> Customers => Set<Customer>();
        public DbSet<Traveler> Travelers => Set<Traveler>();

        #endregion

        #region Sales

        public DbSet<Quotation> Quotations => Set<Quotation>();
        public DbSet<QuotationItem> QuotationItems => Set<QuotationItem>();
        public DbSet<Invoice> Invoices => Set<Invoice>();
        public DbSet<InvoiceItem> InvoiceItems => Set<InvoiceItem>();
        public DbSet<Voucher> Vouchers => Set<Voucher>();
        public DbSet<Booking> Bookings => Set<Booking>();
        public DbSet<Payment> Payments => Set<Payment>();

        #endregion

        #region Reviews

        public DbSet<Review> Reviews => Set<Review>();

        #endregion

        #region Operations

        public DbSet<AgentTask> AgentTasks => Set<AgentTask>();
        public DbSet<Notification> Notifications => Set<Notification>();
        public DbSet<WebsiteVisitor> WebsiteVisitors => Set<WebsiteVisitor>();
        public DbSet<NewsletterSubscription> NewsletterSubscriptions => Set<NewsletterSubscription>();

        #endregion

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
     
            modelBuilder.Entity<User>(u => {
                u.HasKey(s => s.Id);

                u.HasMany(b => b.Customers)
            .WithOne(s => s.Agent).HasForeignKey(d => d.AgentId);
                u.HasMany(b => b.Bookings)
                .WithOne(s => s.User).HasForeignKey(d => d.UserId);
                u.HasMany(b => b.Reviews)
               .WithOne(s => s.User).HasForeignKey(d => d.UserId);

                u.HasMany(b => b.Quotation)
                .WithOne(s => s.SalesAgent).HasForeignKey(d => d.SalesAgentId);



            });

            modelBuilder.Entity<Booking>(b =>
            {
                b.HasKey(s => s.Id);
                b.Property(s => s.CancellationFeeAmount).HasPrecision(18, 2);
                b.Property(s => s.StatusNote).HasMaxLength(1000);
                b.HasIndex(s => new { s.UserId, s.TourId, s.DateFrom, s.DateTo })
                 .IsUnique()
                 .HasFilter("[TourId] IS NOT NULL");
                b.HasIndex(s => new { s.UserId, s.PackageId, s.DateFrom, s.DateTo })
                 .IsUnique()
                 .HasFilter("[PackageId] IS NOT NULL");
                b.HasOne(s => s.Agent)
                 .WithMany()
                 .HasForeignKey(s => s.AgentId)
                 .OnDelete(DeleteBehavior.NoAction);
            });

            modelBuilder.Entity<Customer>(c =>
            {
                c.HasKey(s => s.Id);


            });
            modelBuilder.Entity<Review>(r =>
            {
                r.HasKey(s => s.Id);
                r.HasOne(r => r.Tour)
                 .WithMany(t => t.Reviews)
                 .HasForeignKey(r => r.TourId)
                 .OnDelete(DeleteBehavior.Cascade);
            });


            modelBuilder.Entity<Destination>(d =>
            {
                d.HasKey(s => s.Id);
                d.HasIndex(x => x.NameEng).IsUnique();
                d.HasMany(d => d.Tours)
                 .WithOne(t => t.Destination)
                 .HasForeignKey(t => t.DestinationId)
                 .OnDelete(DeleteBehavior.Cascade);

                d.HasMany(d => d.Cities)
                 .WithOne(c => c.Destination)
                 .HasForeignKey(c => c.DestinationId)
                 .OnDelete(DeleteBehavior.SetNull);
            });




            modelBuilder.Entity<PackageItinerary>(s => {

                s.HasKey(s => s.Id);
                s.HasMany(d => d.Childs)
                 .WithOne(s => s.Parent)
                 .HasForeignKey(s => s.ParentId)
                 .OnDelete(DeleteBehavior.NoAction);


            });
            modelBuilder.Entity<TourItinerary>(s => {

                s.HasKey(s => s.Id);
                s.HasMany(d => d.Childs)
                 .WithOne(s => s.Parent)
                 .HasForeignKey(s => s.ParentId)
                 .OnDelete(DeleteBehavior.NoAction);

            });

            modelBuilder.Entity<PackageDestination>(s => {
                //compositekey
                s.HasKey(s => new { s.DestinationId,s.PackageId });
                s.HasOne(d => d.Package).WithMany(d => d.PackageDestination).HasForeignKey(d => d.PackageId).OnDelete(DeleteBehavior.NoAction);
                s.HasOne(d => d.Destination).WithMany(d => d.PackageDestination).HasForeignKey(d=>d.DestinationId).OnDelete(DeleteBehavior.NoAction);

            });

            modelBuilder.Entity<Package>(p =>
            {
                 p.HasKey(s => s.Id);
                 p.Property(s => s.CurrencyId).HasDefaultValue(2);
                 p.HasOne(s => s.Currency)
                  .WithMany()
                  .HasForeignKey(s => s.CurrencyId)
                  .OnDelete(DeleteBehavior.NoAction);

                  p.HasMany(t => t.Itinerary)
                 .WithOne(d => d.Package)
                 .HasForeignKey(s => s.PackageId)
                  .OnDelete(DeleteBehavior.NoAction);


                p.HasMany(t => t.Bookings)
                  .WithOne(d => d.Package)
                  .HasForeignKey(s => s.PackageId)
                    .OnDelete(DeleteBehavior.NoAction);
                
            });

            modelBuilder.Entity<PackageImage>().HasKey(image => image.Id);
            modelBuilder.Entity<PackageImage>()
                .HasOne(image => image.Package)
                .WithMany(package => package.Images)
                .HasForeignKey(image => image.PackageId)
                .OnDelete(DeleteBehavior.Cascade);


            modelBuilder.Entity<Tour>(t => {
               t.HasKey(s => s.Id);

               t.HasOne(t => t.City)
                .WithMany(c => c.Tours)
                .HasForeignKey(t => t.CityId)
                .OnDelete(DeleteBehavior.SetNull);

               t.HasIndex(t => t.CityId);

               t.HasMany(t => t.Itinerary)
                    .WithOne(d => d.Tour)
                    .HasForeignKey(s => s.TourId)
                    .OnDelete(DeleteBehavior.NoAction);


              t.HasMany(t => t.Highlights)
                    .WithOne(i => i.Tour)
                    .HasForeignKey(i => i.TourId)
                    .OnDelete(DeleteBehavior.Cascade);

               t.HasMany(t => t.Includes)
            .WithOne(i => i.Tour)
            .HasForeignKey(i => i.TourId)
               .OnDelete(DeleteBehavior.Cascade);

               t.HasMany(t => t.Excludes)
            .WithOne(i => i.Tour)
            .HasForeignKey(i => i.TourId)
               .OnDelete(DeleteBehavior.Cascade);


             
                 t.HasMany(t => t.Bookings)
                .WithOne(i => i.Tour)
                .HasForeignKey(i => i.TourId)
                .OnDelete(DeleteBehavior.NoAction);

            });

            modelBuilder.Entity<TourImage>().HasKey(s => s.Id);
            modelBuilder.Entity<TourImage>().HasOne(s => s.Tour).WithMany(t => t.Images).HasForeignKey(s => s.TourId)
                .OnDelete(DeleteBehavior.Cascade);
            modelBuilder.Entity<DestinationImage>().HasKey(s => s.Id);
            modelBuilder.Entity<DestinationImage>().HasOne(s => s.Destination).WithMany(t => t.Images).HasForeignKey(s => s.DestinationId)
                .OnDelete(DeleteBehavior.Cascade);


            modelBuilder.Entity<TourHighlight>().HasKey(s => s.Id);
            modelBuilder.Entity<TourInclude>().HasKey(s => s.Id);
            modelBuilder.Entity<TourExclude>().HasKey(s => s.Id);
            modelBuilder.Entity<Currency>().HasKey(s => s.Id);

            modelBuilder.Entity<City>(city =>
            {
                city.HasKey(s => s.Id);
                city.HasIndex(s => s.DestinationId);
            });

            modelBuilder.Entity<Blog>(blog =>
            {
                blog.HasKey(item => item.Id);
                blog.HasIndex(item => item.TitleEng).IsUnique();
                blog.Property(item => item.TitleEng).HasMaxLength(200).IsRequired();
                blog.Property(item => item.TitleAr).HasMaxLength(200).IsRequired();
                blog.Property(item => item.SummaryEng).HasMaxLength(500);
                blog.Property(item => item.SummaryAr).HasMaxLength(500);
                blog.Property(item => item.ContentEng).HasMaxLength(15000).IsRequired();
                blog.Property(item => item.ContentAr).HasMaxLength(15000).IsRequired();
                blog.HasMany(item => item.Images)
                    .WithOne(item => item.Blog)
                    .HasForeignKey(item => item.BlogId)
                    .OnDelete(DeleteBehavior.Cascade);
            });
            modelBuilder.Entity<BlogImage>(image =>
            {
                image.HasKey(item => item.Id);
                image.Property(item => item.ImageName).HasMaxLength(255).IsRequired();
                image.Property(item => item.ImageUrl).HasMaxLength(500).IsRequired();
            });
            modelBuilder.Entity<Payment>(p =>
            {
                p.HasKey(s => s.Id);
                p.HasOne(t => t.Booking)
               .WithMany()
               .HasForeignKey(i => i.BookingId)
               .OnDelete(DeleteBehavior.Cascade);
                p.HasOne(t => t.Currency)
               .WithMany()
               .HasForeignKey(i => i.CurrencyId)
               .OnDelete(DeleteBehavior.Cascade);
            });


            modelBuilder.Entity<Airline>(r =>
            {
                r.HasKey(s => s.Id);
                r.HasMany(t => t.Flights)
         .WithOne(d => d.Airline)
         .HasForeignKey(s => s.AirlineId)
         .OnDelete(DeleteBehavior.Cascade);

            });
            modelBuilder.Entity<Flight>(f =>
            {
                f.HasKey(s => s.Id);
   
            });

            modelBuilder.Entity<Traveler>(t =>
            {
             t.HasKey(s => s.Id);

                t.HasOne(x => x.Customer)
                 .WithMany(x => x.Travelers)
                 .HasForeignKey(x => x.CustomerId)
                 .OnDelete(DeleteBehavior.Cascade);

             t.Property(x => x.PassportNumber)
            .IsRequired()
            .HasMaxLength(20);
             t.Property(x => x.Relationship).HasMaxLength(50);
            });

            modelBuilder.Entity<Hotel>(h =>
            {
              h.HasKey(s => s.Id);
              h.HasOne(t => t.Destination)
             .WithMany(d=>d.Hotels)
             .HasForeignKey(s=>s.DestinationId)
             .OnDelete(DeleteBehavior.NoAction);

             h.HasMany(t => t.Rooms)
            .WithOne(d => d.Hotel)
            .HasForeignKey(s => s.HotelId)
            .OnDelete(DeleteBehavior.Cascade);

            });
            modelBuilder.Entity<QuotationItem>(q =>
            {
                q.HasKey(s => s.Id);

                q.HasOne(t => t.Package)
                 .WithMany()
                 .HasForeignKey(s => s.PackageId)
                 .OnDelete(DeleteBehavior.NoAction);

                q.HasOne(t => t.Tour)
                .WithMany()
                .HasForeignKey(s => s.TourId)
                .OnDelete(DeleteBehavior.NoAction);


                q.HasOne(t => t.Flight)
                .WithMany()
                .HasForeignKey(s => s.FlightId)
                .OnDelete(DeleteBehavior.NoAction);

                q.HasOne(t => t.Hotel)
             .WithMany()
             .HasForeignKey(s => s.HotelId)
             .OnDelete(DeleteBehavior.NoAction);
            });

            modelBuilder.Entity<Quotation>(q =>
            {
                q.HasKey(s => s.Id);

                q.HasOne(t => t.Customer)
               .WithMany(d => d.Quotations)
               .HasForeignKey(s => s.CustomerId)
               .OnDelete(DeleteBehavior.NoAction);

                 q.HasOne(t => t.Currency)
                .WithMany()
                .HasForeignKey(s => s.CurrencyId)
                .OnDelete(DeleteBehavior.NoAction);

                q.HasMany(t => t.Items)
               .WithOne(d => d.Quotation)
               .HasForeignKey(s => s.QuotationId)
               .OnDelete(DeleteBehavior.Cascade);

            });

            modelBuilder.Entity<Invoice>(invoice =>
            {
                invoice.HasKey(x => x.Id);
                invoice.HasIndex(x => x.InvoiceNo).IsUnique();
                invoice.HasOne(x => x.Customer).WithMany().HasForeignKey(x => x.CustomerId).OnDelete(DeleteBehavior.NoAction);
                invoice.HasOne(x => x.SalesAgent).WithMany().HasForeignKey(x => x.SalesAgentId).OnDelete(DeleteBehavior.NoAction);
                invoice.HasOne(x => x.Currency).WithMany().HasForeignKey(x => x.CurrencyId).OnDelete(DeleteBehavior.NoAction);
                invoice.HasMany(x => x.Items).WithOne(x => x.Invoice).HasForeignKey(x => x.InvoiceId).OnDelete(DeleteBehavior.Cascade);
            });

            modelBuilder.Entity<InvoiceItem>(item =>
            {
                item.HasKey(x => x.Id);
                item.HasOne(x => x.Package).WithMany().HasForeignKey(x => x.PackageId).OnDelete(DeleteBehavior.NoAction);
                item.HasOne(x => x.Tour).WithMany().HasForeignKey(x => x.TourId).OnDelete(DeleteBehavior.NoAction);
            });

            modelBuilder.Entity<Voucher>(voucher =>
            {
                voucher.HasKey(x => x.Id);
                voucher.HasIndex(x => x.VoucherNo).IsUnique();
                voucher.HasOne(x => x.Customer).WithMany().HasForeignKey(x => x.CustomerId).OnDelete(DeleteBehavior.NoAction);
                voucher.HasOne(x => x.SalesAgent).WithMany().HasForeignKey(x => x.SalesAgentId).OnDelete(DeleteBehavior.NoAction);
                voucher.HasOne(x => x.Flight).WithMany().HasForeignKey(x => x.FlightId).OnDelete(DeleteBehavior.NoAction);
                voucher.HasOne(x => x.Hotel).WithMany().HasForeignKey(x => x.HotelId).OnDelete(DeleteBehavior.NoAction);
                voucher.HasOne(x => x.Tour).WithMany().HasForeignKey(x => x.TourId).OnDelete(DeleteBehavior.NoAction);
                voucher.HasOne(x => x.Package).WithMany().HasForeignKey(x => x.PackageId).OnDelete(DeleteBehavior.NoAction);
            });



            modelBuilder.Entity<AgentTask>(t =>
            {
                t.HasKey(s => s.Id);
                t.Property(s => s.Title).IsRequired().HasMaxLength(200);

                t.HasOne(s => s.AssignedToAgent)
                 .WithMany()
                 .HasForeignKey(s => s.AssignedToAgentId)
                 .OnDelete(DeleteBehavior.NoAction);

                t.HasOne(s => s.CreatedByAdmin)
                 .WithMany()
                 .HasForeignKey(s => s.CreatedByAdminId)
                 .OnDelete(DeleteBehavior.NoAction);
            });

            modelBuilder.Entity<Notification>(n =>
            {
                n.HasKey(s => s.Id);
                n.Property(s => s.Title).IsRequired().HasMaxLength(200);
                n.Property(s => s.Message).IsRequired().HasMaxLength(1000);

                n.HasOne(s => s.User)
                 .WithMany()
                 .HasForeignKey(s => s.UserId)
                 .OnDelete(DeleteBehavior.Cascade);
            });

            modelBuilder.Entity<WebsiteVisitor>(visitor =>
            {
                visitor.HasKey(item => item.Id);
                visitor.HasIndex(item => item.VisitorId).IsUnique();
                visitor.Property(item => item.VisitorId).IsRequired();
                visitor.Property(item => item.FirstVisitedAtUtc).HasPrecision(0);
                visitor.Property(item => item.LastVisitedAtUtc).HasPrecision(0);
                visitor.Property(item => item.VisitCount).HasDefaultValue(1);
            });

            modelBuilder.Entity<NewsletterSubscription>(subscription =>
            {
                subscription.HasKey(item => item.Id);
                subscription.Property(item => item.Email).HasMaxLength(254).IsRequired();
                subscription.Property(item => item.NormalizedEmail).HasMaxLength(254).IsRequired();
                subscription.Property(item => item.SubscribedAtUtc).HasPrecision(0);
                subscription.Property(item => item.WelcomeEmailSentAtUtc).HasPrecision(0);
                subscription.Property(item => item.WelcomeEmailLastAttemptAtUtc).HasPrecision(0);
                subscription.Property(item => item.WelcomeEmailAttemptCount).HasDefaultValue(0);
                subscription.HasIndex(item => item.NormalizedEmail).IsUnique();
            });

            modelBuilder.AddUsersSeed();
            modelBuilder.AddDestinationsSeed();
            modelBuilder.AddCurrenciesSeed();
            modelBuilder.AddCitiesSeed();

            base.OnModelCreating(modelBuilder);

        }

    }
}
