using NServiceBus;

namespace NewsPortal.MessagesNewsToElastic
{
    public class NewsDeleteCommand : ICommand
    {
        public int Id { get; set; }
    }
}
