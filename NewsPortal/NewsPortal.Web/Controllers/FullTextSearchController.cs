using System.Web.Http;
using NewsPortal.BLL.Interfaces;

namespace NewsPortal.Web.Controllers
{
    public class FullTextSearchController : ApiController
    {
        private readonly IElasticService _elasticService;

        public FullTextSearchController(IElasticService elasticService)
        {
            _elasticService = elasticService;
        }

        [HttpGet]
        [Route("api/elastic/all")]
        public IHttpActionResult GetAll(int from, int count)
        {
            return Ok(_elasticService.GetNewsWithPaging(from, count));
        }

        [HttpGet]
        [Route("api/elastic/value")]
        public IHttpActionResult GetBySearchTerm(string searchTerm, int from, int count)
        {
            return Ok(_elasticService.GetNewsBySearchTerm(searchTerm, from, count));
        }

        [HttpGet]
        [Route("api/elastic/category")]
        public IHttpActionResult GetByCategory(string category, int from, int count)
        {
            return Ok(_elasticService.GetNewsByCategory(category, from, count));
        }

        [HttpGet]
        [Route("api/elastic/categoryandvalue")]
        public IHttpActionResult GetByCategoryAndSearchTerm(string category, string searchTerm, int from, int count)
        {
            return Ok(_elasticService.GetByCategoryAndSearchTerm(category, searchTerm, from, count));
        }

        [HttpGet]
        [Route("api/elastic/categories")]
        public IHttpActionResult GetAllWithoutPaging()
        {
            return Ok(_elasticService.GetCategories());
        }
    }
}