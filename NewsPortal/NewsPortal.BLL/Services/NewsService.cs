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
    public class NewsService : INewsService
    {
        private readonly IUnitOfWork _database;
        private readonly ISenderToQueueElasticUpdate _senderToElastic;
        private readonly IMapper _mapper;

        public NewsService(IUnitOfWork unitOfWork, IMapper mapper, ISenderToQueueElasticUpdate senderToElastic)
        {
            _database = unitOfWork;
            _mapper = mapper;
            _senderToElastic = senderToElastic;
        }

        public async Task<NewsDto> Create(NewsDto item)
        {
            News news = await _database.NewsRepository.Create(_mapper.Map<NewsDto, News>(item));

            if (news.Published)
            {
                await ToQueueElasticUpdate(news);
            }

            return _mapper.Map<News, NewsDto>(news);
        }

        public async Task<NewsDto> GetById(int id)
        {
            News news = await _database.NewsRepository.GetById(id);
            return _mapper.Map<News, NewsDto>(news);
        }

        public async Task<NewsDto> Remove(int id)
        {
            News news = await _database.NewsRepository.Remove(id);

            if (news.Published)
            {
                await _senderToElastic.DeleteNewsFromElastic(news.Id);
                await _senderToElastic.DeleteNewsFromElastic(news.CategoryId);
            }

            return _mapper.Map<News, NewsDto>(news);
        }

        public async Task<NewsDto> Update(NewsDto item)
        {
            int oldCategoryId = (await _database.NewsRepository.GetById(item.Id)).CategoryId;
            News news = await _database.NewsRepository.Update(_mapper.Map<NewsDto, News>(item));

            if (news.Published)
            {
                await ToQueueElasticUpdate(news);

                if (oldCategoryId != item.CategoryId)
                {
                    await ToQueueElasticUpdate(oldCategoryId);
                    await ToQueueElasticUpdate(item.CategoryId);
                }
            }

            return _mapper.Map<News, NewsDto>(news);
        }

        public bool CheckUniqueTitle(string value)
        {
            return _database.NewsRepository.CheckUniqueTitle(value);
        }

        public IEnumerable<NewsDto> AddRange(List<NewsDto> items)
        {
            IEnumerable<News> news = _database.NewsRepository.AddRange(_mapper.Map<List<NewsDto>, List<News>>(items));
            return _mapper.Map<IEnumerable<News>, IEnumerable<NewsDto>>(news);
        }

        public List<NewsDto> GetAll()
        {
            List<News> news = _database.NewsRepository.Query().ToList();
            return _mapper.Map<List<News>, List<NewsDto>>(news);
        }

        public IQueryable<News> Query()
        {
            return _database.NewsRepository.Query();
        }

        private Task AsyncSendToElastic(IEnumerable<News> news)
        {
            List<Task> listTasks = new List<Task>();

            foreach (var item in news)
            {
                if (item.Published)
                {
                    listTasks.Add(ToQueueElasticUpdate(item));
                }
            }

            foreach (var task in listTasks)
            {
                task.Start();
            }

            Task.WaitAll(listTasks.ToArray());

            return Task.CompletedTask;
        }

        private async Task ToQueueElasticUpdate(int id)
        {
            Category temp = await _database.CategoryRepository.GetById(id);

            UpdateCategoriesInfoCommand categoryUpdateOrCreate = new UpdateCategoriesInfoCommand
            {
                Id = id,
                Name = temp.Name,
                CountNews = temp.News.Count
            };

            await _senderToElastic.UpdateElasticCategories(categoryUpdateOrCreate);
        }

        private async Task ToQueueElasticUpdate(News newNews)
        {
            NewsUpdateOrCreateCommand newsUpdateOrCreate = new NewsUpdateOrCreateCommand
            {
                ApplicationUserId = newNews.ApplicationUserId,
                Body = newNews.Body,
                CategoryId = newNews.CategoryId,
                CategoryName = (await _database.CategoryRepository.GetById(newNews.CategoryId)).Name,
                CreatedDate = newNews.CreatedDate,
                Description = newNews.Description,
                Id = newNews.Id,
                Published = newNews.Published,
                Title = newNews.Title,
                UserName = (await _database.ProfileRepository.GetById(newNews.ApplicationUserId)).Name
            };

            await _senderToElastic.AddOrUpdateElasticNews(newsUpdateOrCreate);
        }
    }
}
