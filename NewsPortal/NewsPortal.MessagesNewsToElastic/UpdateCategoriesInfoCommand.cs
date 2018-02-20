using NServiceBus;

namespace NewsPortal.MessagesNewsToElastic
{
    public class UpdateCategoriesInfoCommand : ICommand
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int CountNews { get; set; }
    }
}
