using System;
using System.Collections.Generic;
using System.Text;

namespace TravelAgency.Domain.Entities
{
    public class PackageDestination
    {
        public int PackageId { get; set; }

        public int DestinationId { get; set; }

        public int DisplayOrder { get; set; }

        public Package Package { get; set; } = default!;

        public Destination Destination { get; set; } = default!;
    }
}
