using System;

namespace NewsPortal.NewsFeeder
{
    public class NewsFromFeed
    {
        public string Title { get; set; }

        public string Body { get; set; }
        public string Description { get; set; }

        public DateTime PublishedDate { get; set; }

        public string CategoryName { get; set; }
    }
}
