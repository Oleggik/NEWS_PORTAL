using System;
using NServiceBus;

namespace NewsPortal.MessagesNewsToElastic
{
    public class NewsUpdateOrCreateCommand : ICommand
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Body { get; set; }
        public string Description { get; set; }
        public DateTime CreatedDate { get; set; }
        public bool Published { get; set; }
        public string UserName { get; set; }
        public string CategoryName { get; set; }
        public string ApplicationUserId { get; set; }
        public int CategoryId { get; set; }
    }
}
