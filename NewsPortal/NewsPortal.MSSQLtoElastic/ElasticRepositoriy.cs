using System.Linq;
using ElasticsearchCRUD;
using System.Configuration;
using NewsPortal.BLL.Interfaces;
using System.Collections.Generic;
using NewsPortal.BLL.DTO;
using System.Threading.Tasks;

namespace NewsPortal.MSSQLtoElastic
{
    public class ElasticRepository
    {
        private readonly ICategoryService _categoryService;
        private readonly INewsService _newsService;
        private readonly IUserService _userService;

        public ElasticRepository(ICategoryService categoryService, INewsService newsService, IUserService userService)
        {
            _categoryService = categoryService;
            _newsService = newsService;
            _userService = userService;
        }

        public async Task SaveDocumentToElasticsearch()
        {
            IElasticsearchMappingResolver elasticsearchMappingResolver = new ElasticsearchMappingResolver();

            using (var elasticsearchContext = new ElasticsearchContext(ConfigurationManager.AppSettings["ElasticServer"], elasticsearchMappingResolver))
            {
                List<NewsDto> news = _newsService.GetAll().Where(a => a.Published).ToList();

                foreach (NewsDto item in news)
                {
                    FullInfoNews newNews = new FullInfoNews
                    {
                        ApplicationUserId = item.ApplicationUserId,
                        Body = item.Body,
                        CategoryId = item.CategoryId,
                        CategoryName = (await _categoryService.GetById(item.CategoryId)).Name,
                        CreatedDate = item.CreatedDate,
                        Title = item.Title,
                        UserName = await _userService.GetUserNameById(item.ApplicationUserId),
                        Id = item.Id,
                        Description = item.Description,
                        Published = item.Published
                    };

                    elasticsearchContext.AddUpdateDocument(newNews, newNews.Id);
                    elasticsearchContext.SaveChanges();
                }

                List<CategoryDto> categories = _categoryService.GetAll().Where(a => a.Active).ToList();

                foreach (CategoryDto item in categories)
                {
                    CategoryForElastic newCategory = new CategoryForElastic
                    {
                        Id = item.Id,
                        Name = item.Name,
                        CountNews = _categoryService.NewsCountByCategory(item.Id)
                    };

                    elasticsearchContext.AddUpdateDocument(newCategory, newCategory.Id);
                    elasticsearchContext.SaveChanges();
                }
            }
        }
    }
}
