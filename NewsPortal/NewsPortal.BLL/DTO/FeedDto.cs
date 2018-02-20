using System;

namespace NewsPortal.BLL.DTO
{
    public class FeedDto
    {
        public int Id { get; set; }
        public string Link { get; set; }
        public DateTime? LastNewsDate { get; set; }
    }
}
