using System.Collections.Generic;
using NewsPortal.BLL.DTO;

namespace NewsPortal.BLL.Interfaces
{
    public interface IElasticService
    {
        NewsFromElastic GetNewsWithPaging(int from, int count);
        NewsFromElastic GetNewsByCategory(string category, int from, int count);
        NewsFromElastic GetNewsBySearchTerm(string searchTerm, int from, int count);
        NewsFromElastic GetByCategoryAndSearchTerm(string category, string searchTerm, int from, int count);
        List<CategoryForElastic> GetCategories();
    }
}
