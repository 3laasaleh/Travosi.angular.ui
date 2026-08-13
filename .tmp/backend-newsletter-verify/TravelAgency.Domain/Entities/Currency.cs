using System;
using System.Collections.Generic;
using System.Text;

namespace TravelAgency.Domain.Entities
{
    public class Currency
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Sign { get; set; }=string.Empty;
    }
}
