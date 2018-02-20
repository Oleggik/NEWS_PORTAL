using System.Collections.Generic;
using NewsPortal.DAL.Entities;
using NewsPortal.DAL.Interfaces;
using NewsPortal.BLL.DTO;
using NewsPortal.BLL.Interfaces;
using System.Threading.Tasks;
using AutoMapper;
using System.Linq;
using NewsPortal.BLL.MessageQueue;
using NewsPortal.MessagesNewsToElastic;

namespace NewsPortal.BLL.Services
{
    public class CategoryService : ICategoryService
    {
        private readonly IUnitOfWork _database;
        private readonly ISenderToQueueElasticUpdate _senderToElastic;
        private readonly IMapper _mapper;

        public CategoryService(IUnitOfWork unitOfWork, IMapper mapper, ISenderToQueueElasticUpdate senderToElastic)
        {
            _database = unitOfWork;
            _mapper = mapper;
            _senderToElastic = senderToElastic;
        }

        public async Task<CategoryDto> Create(CategoryDto item)
        {
            Category category = await _database.CategoryRepository.Create(_mapper.Map<CategoryDto, Category>(item));
            await ToQueueElasticUpdate(category);
            return _mapper.Map<Category, CategoryDto>(category);
        }

        public async Task<CategoryDto> GetById(int id)
        {
            Category category = await _database.CategoryRepository.GetById(id);
            return _mapper.Map<Category, CategoryDto>(category);
        }

        public async Task<CategoryDto> Remove(int id)
        {
            Category category = await _database.CategoryRepository.Remove(id);
            await _senderToElastic.DeleteCategoryFromElastic(category.Id);
            return _mapper.Map<Category, CategoryDto>(category);
        }

        public async Task<CategoryDto> Update(CategoryDto item)
        {
            Category category = await _database.CategoryRepository.Update(_mapper.Map<CategoryDto, Category>(item));
            return _mapper.Map<Category, CategoryDto>(category);
        }

        public bool CheckUniqueName(string value)
        {
            return _database.CategoryRepository.CheckUniqueName(value);
        }

        public List<CategoryDto> GetAll()
        {
            return _mapper.Map<List<Category>, List<CategoryDto>>(_database.CategoryRepository.GetAll());
        }

        public int GetIdByName(string value)
        {
            return _database.CategoryRepository.GetIdByName(value);
        }

        public IQueryable<Category> Query()
        {
            return _database.CategoryRepository.Query();
        }

        public int NewsCountByCategory(int id)
        {
            return _database.NewsRepository.Get(a => a.CategoryId == id && a.Published).Count();
        }

        private async Task ToQueueElasticUpdate(Category category)
        {
            UpdateCategoriesInfoCommand categoryUpdateOrCreate = new UpdateCategoriesInfoCommand
            {
                Id = category.Id,
                Name = category.Name,
                CountNews = NewsCountByCategory(category.Id)
            };

            await _senderToElastic.UpdateElasticCategories(categoryUpdateOrCreate);
        }
    }
}
