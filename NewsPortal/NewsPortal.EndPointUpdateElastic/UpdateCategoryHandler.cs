using NServiceBus;
using System.Configuration;
using System.Threading.Tasks;
using ElasticsearchCRUD;
using NewsPortal.BLL.DTO;
using NewsPortal.MessagesNewsToElastic;

namespace NewsPortal.EndPointUpdateElastic
{
    class UpdateCategoryHandler : IHandleMessages<UpdateCategoriesInfoCommand>
    {
        public Task Handle(UpdateCategoriesInfoCommand message, IMessageHandlerContext context)
        {
            IElasticsearchMappingResolver elasticsearchMappingResolver = new ElasticsearchMappingResolver();

            using (var elasticsearchContext = new ElasticsearchContext(ConfigurationManager.AppSettings["ElasticServer"], elasticsearchMappingResolver))
            {
                CategoryForElastic newNews = new CategoryForElastic
                {
                    Id = message.Id,
                    Name = message.Name,
                    CountNews = message.CountNews
                };

                elasticsearchContext.AddUpdateDocument(newNews, newNews.Id);
                elasticsearchContext.SaveChanges();
            }

            return Task.CompletedTask;
        }
    }
}
