using System.Threading.Tasks;
using NServiceBus;
using NewsPortal.MessagesNewsToElastic;
using NewsPortal.BLL.DTO;
using ElasticsearchCRUD;
using System.Configuration;

namespace NewsPortal.EndPointUpdateElastic
{
    public class NewsUpdateHandler : IHandleMessages<NewsUpdateOrCreateCommand>
    {
        public Task Handle(NewsUpdateOrCreateCommand message, IMessageHandlerContext context)
        {
            IElasticsearchMappingResolver elasticsearchMappingResolver = new ElasticsearchMappingResolver();

            using (var elasticsearchContext = new ElasticsearchContext(ConfigurationManager.AppSettings["ElasticServer"], elasticsearchMappingResolver))
            {
                FullInfoNews newNews = new FullInfoNews
                {
                    ApplicationUserId = message.ApplicationUserId,
                    Body = message.Body,
                    CategoryId = message.CategoryId,
                    CategoryName = message.CategoryName,
                    CreatedDate = message.CreatedDate,
                    Title = message.Title,
                    UserName = message.UserName,
                    Id = message.Id,
                    Description = message.Description,
                    Published = message.Published
                };

                elasticsearchContext.AddUpdateDocument(newNews, newNews.Id);
                elasticsearchContext.SaveChanges();
            }

            return Task.CompletedTask;
        }
    }
}
