using System;
using System.Collections.Generic;
using System.Text;

namespace TravelAgency.Domain.Models
{
    public class PaginationModel<T> where T : class
    {
        public List<T> Data { get; set; } = new List<T>();

        public int Page { get; set; } = 1;

        public int PageSize { get; set; } = 20;

        public int TotalCount { get; set; }

        public int TotalPages => (int)Math.Ceiling((double)TotalCount / PageSize);

        public int CurrentPageCount => Data.Count;

        public bool HasPrevious => Page > 1;

        public bool HasNext => Page < TotalPages;
    }
}
