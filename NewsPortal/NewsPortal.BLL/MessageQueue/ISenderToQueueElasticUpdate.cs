using System.Threading.Tasks;
using NewsPortal.MessagesNewsToElastic;

namespace NewsPortal.BLL.MessageQueue
{
    public interface ISenderToQueueElasticUpdate
    {
        Task AddOrUpdateElasticNews(NewsUpdateOrCreateCommand newsUpdateOrCreate);
        Task DeleteNewsFromElastic(int id);
        Task UpdateElasticCategories(UpdateCategoriesInfoCommand categories);
        Task DeleteCategoryFromElastic(int id);
    }
}
