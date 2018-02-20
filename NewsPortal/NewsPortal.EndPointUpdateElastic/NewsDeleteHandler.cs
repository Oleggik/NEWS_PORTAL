using System.Threading.Tasks;
using NServiceBus;
using NewsPortal.MessagesNewsToElastic;
using NewsPortal.BLL.DTO;
using ElasticsearchCRUD;
using System.Configuration;

namespace NewsPortal.EndPointUpdateElastic
{
    public class NewsDeleteHandler : IHandleMessages<NewsDeleteCommand>
    {
        public Task Handle(NewsDeleteCommand message, IMessageHandlerContext context)
        {
            IElasticsearchMappingResolver elasticsearchMappingResolver = new ElasticsearchMappingResolver();

            using (var elasticsearchContext = new ElasticsearchContext(ConfigurationManager.AppSettings["ElasticServer"], elasticsearchMappingResolver))
            {
                elasticsearchContext.DeleteDocument<FullInfoNews>(message.Id);
                elasticsearchContext.SaveChanges();
            }

            return Task.CompletedTask;
        }
    }
}
