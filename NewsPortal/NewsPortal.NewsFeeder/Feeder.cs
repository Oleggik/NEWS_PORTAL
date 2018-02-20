using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Suyati.FeedAggreagator;
using AutoMapper;
using NewsPortal.BLL.DTO;
using NewsPortal.BLL.Interfaces;

namespace NewsPortal.NewsFeeder
{
    public class RSSFeeder
    {
        private readonly ICategoryService _categoryService;
        private readonly INewsService _newsService;
        private readonly IFeederService _feederService;
        private readonly IUserService _userService;
        private readonly RemoteLoaderFeed _remoteLoaderFeed;
        private readonly int _bulkCount =  11;
        
        public RSSFeeder(RemoteLoaderFeed remoteLoaderFeed, ICategoryService categoryService, INewsService newsService, IFeederService feederService, IUserService userService)
        {
            _remoteLoaderFeed = remoteLoaderFeed;
            _categoryService = categoryService;
            _newsService = newsService;
            _feederService = feederService;
            _userService = userService;
        }

        public async Task Run()
        {
            Logger.Log.Info($"Start task {DateTime.Now}");

            foreach (var feed in GetLinksFromDb())
            {
                try
                {
                    if (_remoteLoaderFeed.LinkIsValid(feed.Link))
                    {
                        List<NewsFromFeed> feeds = GetNewsFromFeed(feed);
                        List<string> categories = GetAllFeedCategories(feeds);
                        await AddCategoriesInDb(categories);
                        List<string> usersIds = GetUsersId();
                        if (usersIds.Count != 0)
                        {
                            if (feeds.Count != 0)
                            {
                                List<NewsDto> news = MappingNewsFromFeedToNews(feeds, usersIds);
                                DateTime? lastNewsDate = await NewsBulkInsert(news);
                                UpdateFeedInDb(feed.Id, lastNewsDate);
                            }
                            else
                            {
                                Logger.Log.Info("New news not found!");
                            }
                        }
                        else
                        {
                            Logger.Log.Info("Users not found!");
                        }
                    }
                    else
                    {
                        Logger.Log.Info($"Not valid link {feed.Link}");
                    }
                }
                catch (Exception ex)
                {
                    Logger.Log.Info($"Exeption on link {feed.Link}");
                    Logger.Log.Error(ex.Message);
                    Logger.Log.Error(ex.StackTrace);
                }
            }

            Logger.Log.Info("Task end");
        }

        private List<FeedDto> GetLinksFromDb()
        {
            Logger.Log.Info("Start pulling links from database!");
            List<FeedDto> feeds = _feederService.GetAll();
            Logger.Log.Info($"End pulling links from database (count = {feeds.Count})!");
            return feeds;
        }

        private List<NewsFromFeed> GetNewsFromFeed(FeedDto feed)
        {
            Logger.Log.Info($"Start pull news from {feed.Link}!");

            List<IFeedItem> news = _remoteLoaderFeed.GetRemoteFeed(feed.Link)
                .Where(a => a.PublishedDate > (feed.LastNewsDate ?? DateTime.MinValue))
                .OrderBy(a => a.PublishedDate)
                .ToList();

            Logger.Log.Info($"Founded {news.Count} new news");
            return Mapper.Map<List<IFeedItem>, List<NewsFromFeed>>(news);
        }

        private List<string> GetAllFeedCategories(List<NewsFromFeed> news)
        {
            List<string> categories = news.Select(a => a.CategoryName).Distinct().ToList();
            Logger.Log.Info($"Found {categories.Count} categories");
            return categories;
        }

        private async Task AddCategoriesInDb(List<string> categories)
        {
            int counter = 0;
            Logger.Log.Info("Start added categories in database");
            List<string> categoriesFromDb = _categoryService.GetAll().Select(a => a.Name).ToList();

            foreach (var category in categories)
            {
                try
                {
                    if (!categoriesFromDb.Contains(category))
                    {
                        await _categoryService.Create(new CategoryDto { Name = category, Active = true });
                        counter++;
                    }
                }
                catch (Exception ex)
                {
                    Logger.Log.Error(ex.Message);
                    Logger.Log.Error(ex.StackTrace);
                }
                
            }
            Logger.Log.Info($"End added category in database (count = {counter})");
        }

        private List<string> GetUsersId()
        {
            Logger.Log.Info("Get users from database");
            List<string> users = _userService.GetAllUsersIds();
            Logger.Log.Info($"Count users from database {users.Count}");
            return users;
        }

        private List<NewsDto> MappingNewsFromFeedToNews(List<NewsFromFeed> feeds, List<string> users)
        {
            Logger.Log.Info("Start mapping newsfeed to news");
            List<NewsDto> news = new List<NewsDto>();
            Random random = new Random();

            foreach (var item in feeds)
            {
                NewsDto newNews = Mapper.Map<NewsFromFeed, NewsDto>(item);
                newNews.Published = true;
                newNews.CategoryId = _categoryService.GetIdByName(item.CategoryName);
                newNews.ApplicationUserId = users[random.Next(0, users.Count)];
                news.Add(newNews);
            }
            Logger.Log.Info("End mapping newsfeed to news");
            return news;
        }
        
        private async Task<DateTime?> NewsBulkInsert(List<NewsDto> news)
        {
            Logger.Log.Info("Start edded news indatabase!");
            DateTime? lastAddedNews = null;
            try
            {
                foreach (List<NewsDto> items in news.SplitList(_bulkCount))
                {
                     _newsService.AddRange(items);
                    lastAddedNews = items.Last().CreatedDate;
                }
            }
            catch (Exception ex)
            {
                Logger.Log.Error(ex.Message);
                Logger.Log.Error(ex.StackTrace);
            }
            Logger.Log.Info("End edded news indatabase!");

            return lastAddedNews;
        }

        private async void UpdateFeedInDb(int feedId, DateTime? datePulling)
        {
            if (datePulling.HasValue)
            {
                Logger.Log.Info("Update feed in database!");
                Logger.Log.Info($"Date the last added news {datePulling}!");

                FeedDto feed = await _feederService.GetById(feedId);
                await _feederService.Remove(feedId);
                feed.LastNewsDate = datePulling;
                await _feederService.Create(feed);
            }
        }
    }
}
