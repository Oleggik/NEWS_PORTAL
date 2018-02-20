using System.Collections.Generic;
using NewsPortal.DAL.Entities;

namespace NewsPortal.DAL.Interfaces
{
    public interface IElasticRepository
    {
        ResultSetFromElastic GetNewsFromBody(object body);
        List<CategoryElastic> GetCategoriesFromBody(object body);
    }
}
