using Microsoft.EntityFrameworkCore;
using TravelAgency.Domain.Entities;
using TravelAgency.Domain.Enums;

namespace TravelAgency.InfraStructure.Persistence.SeedData
{
    public static class SeedMethods
    {
        public static void AddDestinationsSeed(this ModelBuilder modelBuilder) {

                 var destinations = new List<Destination>
                {
                    new()
                    {
                        Id = 1,
                        NameEng = "Luxor",
                        NameAr = "الأقصر",
                        Description = "Discover the world's greatest open-air museum with Karnak Temple, Luxor Temple, the Valley of the Kings, and unforgettable Nile cruises.",
                        IsActive = true
                    },
                    new()
                    {
                        Id = 2,
                        NameEng = "Aswan",
                        NameAr = "أسوان",
                        Description = "Enjoy the beauty of the Nile, Philae Temple, Nubian villages, and the peaceful atmosphere of southern Egypt.",
                        IsActive = true
                    },
                    new()
                    {
                        Id = 3,
                        NameEng = "Hurghada",
                        NameAr = "الغردقة",
                        Description = "Experience crystal-clear waters, colorful coral reefs, luxury resorts, and exciting water sports on the Red Sea.",
                        IsActive = true
                    },
                    new()
                    {
                        Id = 4,
                        NameEng = "Sharm El Sheikh",
                        NameAr = "شرم الشيخ",
                        Description = "A world-famous Red Sea destination offering diving, snorkeling, luxury resorts, and vibrant nightlife.",
                        IsActive = true
                    },
                    new()
                    {
                        Id = 5,
                        NameEng = "Cairo",
                        NameAr = "القاهرة",
                        Description = "Visit the Pyramids of Giza, the Egyptian Museum, Khan El Khalili Bazaar, and the historic streets of Old Cairo.",
                        IsActive = true
                    },
                    new()
                    {
                        Id = 6,
                        NameEng = "Alexandria",
                        NameAr = "الإسكندرية",
                        Description = "Explore the Mediterranean coastline, Bibliotheca Alexandrina, Citadel of Qaitbay, and rich Greco-Roman history.",
                        IsActive = true
                    },
                    new()
                    {
                        Id = 7,
                        NameEng = "Siwa Oasis",
                        NameAr = "واحة سيوة",
                        Description = "Relax in natural springs, explore the Great Sand Sea, ancient temples, and unique Berber culture.",
                        IsActive = true
                    },
                    new()
                    {
                        Id = 8,
                        NameEng = "Dahab",
                        NameAr = "دهب",
                        Description = "A paradise for divers and adventurers, famous for the Blue Hole, desert safaris, and laid-back atmosphere.",
                        IsActive = true
                    },
                    new()
                    {
                        Id = 9,
                        NameEng = "Marsa Alam",
                        NameAr = "مرسى علم",
                        Description = "Discover pristine beaches, diving with dolphins, sea turtles, and untouched coral reefs.",
                        IsActive = true
                    },
                    new()
                    {
                        Id = 10,
                        NameEng = "Abu Simbel",
                        NameAr = "أبو سمبل",
                        Description = "Visit the magnificent temples of Ramses II, one of Egypt's most iconic archaeological treasures.",
                        IsActive = true
                    }
                };

            modelBuilder.Entity<Destination>().HasData(destinations);

            var images = new List<DestinationImage>
            {
                // Luxor
                new() { Id = 1,DestinationId=1, ImageUrl = "https://images.unsplash.com/photo-1572252009286-268acec5ca0a" },
                new() { Id = 2,DestinationId=1, ImageUrl = "https://images.unsplash.com/photo-1568322445389-f64ac2515020" },
                new() { Id = 3, DestinationId=1,ImageUrl = "https://images.unsplash.com/photo-1591608971362-f08b2a75731a" },

                // Hurghada
                new() { Id = 4,DestinationId=3, ImageUrl = "https://images.unsplash.com/photo-1544551763-46a013bb70d5" },
                new() { Id = 5,DestinationId=3, ImageUrl = "https://images.unsplash.com/photo-1507525428034-b723cf961d3e" },
                new() { Id = 6,DestinationId=3, ImageUrl = "https://images.unsplash.com/photo-1519046904884-53103b34b206" },

                // Sharm El Shei
                new() { Id = 7,DestinationId=4, ImageUrl = "https://images.unsplash.com/photo-1500375592092-40eb2168fd21" },
                new() { Id = 8,DestinationId=4, ImageUrl = "https://images.unsplash.com/photo-1506744038136-46273834b3fb" },
                new() { Id = 9,DestinationId=4, ImageUrl = "https://images.unsplash.com/photo-1473116763249-2faaef81ccda" },

                // Cairo
                new() { Id = 10,DestinationId=5, ImageUrl = "https://images.unsplash.com/photo-1572252009286-268acec5ca0a" },
                new() { Id = 11,DestinationId=5, ImageUrl = "https://images.unsplash.com/photo-1539650116574-75c0c6d73f4b" },
                new() { Id = 12,DestinationId=5, ImageUrl = "https://images.unsplash.com/photo-1591608971362-f08b2a75731a" }
            };

            modelBuilder.Entity<DestinationImage>().HasData(images);
        }

        public static void AddUsersSeed(this ModelBuilder modelBuilder)
        {

            modelBuilder.Entity<User>().HasData(
           new User
           {
               Id = 1,
               FirstName = "admin",
               LastName = "admin",
               Password_Hashed = "WQzhk3zhSwJ6I0HCH2eWAMpmQnXd0qgXtrAMTr+Sbck=",
               SaltKey = "FN55EN083FYpdN/tdFcLDQ==",
               Role = UserRoleEnum.Admin,
               Email = "admin@gmail.com",
               Mobile = "01010660737",

           },
                 new User
                 {
                     Id = 2,
                     FirstName = "Customer",
                     LastName = "Customer",
                     Password_Hashed = "WQzhk3zhSwJ6I0HCH2eWAMpmQnXd0qgXtrAMTr+Sbck=",
                     SaltKey = "FN55EN083FYpdN/tdFcLDQ==",
                     Role = UserRoleEnum.Customer,
                     Email = "Customer@gmail.com",
                     Mobile = "01010660747"
                 },
                 new User
                 {
                     Id = 3,
                     FirstName = "Sales",
                     LastName = "Agent",
                     Password_Hashed = "WQzhk3zhSwJ6I0HCH2eWAMpmQnXd0qgXtrAMTr+Sbck=",
                     SaltKey = "FN55EN083FYpdN/tdFcLDQ==",
                     Role = UserRoleEnum.Agent,
                     Email = "agent@gmail.com",
                     Mobile = "01010660757"
                 }

            );

        }
        public static void AddCurrenciesSeed(this ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Currency>().HasData(
                new Currency { Id = 1, Name = "Egyptian Pound", Sign = "EGP" },
                new Currency { Id = 2, Name = "USD", Sign = "$" }
                );

        }
        public static void AddCitiesSeed(this ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<City>().HasData(
               // Egypt
              new City { Id = 1, DestinationId = 5, NameEng = "Cairo", NameAr = "القاهرة" },
              new City { Id = 2, DestinationId = 6, NameEng = "Alexandria", NameAr = "الإسكندرية" },
              new City { Id = 3, NameEng = "Giza", NameAr = "الجيزة" },
              new City { Id = 4, DestinationId = 1, NameEng = "Luxor", NameAr = "الأقصر" },
              new City { Id = 5, DestinationId = 2, NameEng = "Aswan", NameAr = "أسوان" },
              new City { Id = 6, DestinationId = 3, NameEng = "Hurghada", NameAr = "الغردقة" },
              new City { Id = 7, DestinationId = 4, NameEng = "Sharm El Sheikh", NameAr = "شرم الشيخ" },
              new City { Id = 8, DestinationId = 8, NameEng = "Dahab", NameAr = "دهب" },
              new City { Id = 9, DestinationId = 9, NameEng = "Marsa Alam", NameAr = "مرسى علم" },
              new City { Id = 10, DestinationId = 7, NameEng = "Siwa", NameAr = "سيوة" }
                          );

        }

    }
}
