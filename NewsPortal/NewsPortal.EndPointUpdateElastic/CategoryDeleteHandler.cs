using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ElasticsearchCRUD;
using NewsPortal.BLL.DTO;
using NewsPortal.MessagesNewsToElastic;
using NServiceBus;

namespace NewsPortal.EndPointUpdateElastic
{
    public class CategoryDeleteHandler : IHandleMessages<RemoveCategoryCommand>
    {
        public Task Handle(RemoveCategoryCommand message, IMessageHandlerContext context)
        {
            IElasticsearchMappingResolver elasticsearchMappingResolver = new ElasticsearchMappingResolver();

            using (var elasticsearchContext = new ElasticsearchContext(ConfigurationManager.AppSettings["ElasticServer"], elasticsearchMappingResolver))
            {
                elasticsearchContext.DeleteDocument<CategoryForElastic>(message.Id);
                elasticsearchContext.SaveChanges();
            }

            return Task.CompletedTask;
        }
    }
}
