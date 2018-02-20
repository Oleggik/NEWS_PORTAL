using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using NewsPortal.NewsFeeder;
using AutoMapper;
using Suyati.FeedAggreagator;
using System;
using NewsPortal.BLL.DTO;
using NewsPortal.BLL.Interfaces;

namespace NewsPortal.Tests
{
    [TestClass]
    public class NewsFeederTest
    {
        [ClassInitialize]
        public static void Initialize(TestContext context)
        {
            Mapper.Reset();
            AutomapperConfig.Configure();
        }

        [TestMethod]
        public async Task When_getnullfeeds_Then_no_check_link()
        {
            Mock<ICategoryService> categotyService = new Mock<ICategoryService>();
            Mock<INewsService> newsService = new Mock<INewsService>();
            Mock<IFeederService> feederService = new Mock<IFeederService>();
            Mock<IUserService> userService = new Mock<IUserService>();
            Mock<RemoteLoaderFeed> remoteLoader = new Mock<RemoteLoaderFeed>();

            RSSFeeder feeder = new RSSFeeder(
                remoteLoader.Object,
                categotyService.Object,
                newsService.Object,
                feederService.Object,
                userService.Object
            );

            feederService.Setup(a => a.GetAll()).Returns(new List<FeedDto>()).Verifiable();

            await feeder.Run();

            remoteLoader.Verify(vl => vl.LinkIsValid(It.IsAny<string>()), Times.Never);
        }

        [TestMethod]
        public async Task When_throw_exception_Then_go_to_next_feed()
        {
            Mock<ICategoryService> categotyService = new Mock<ICategoryService>();
            Mock<INewsService> newsService = new Mock<INewsService>();
            Mock<IFeederService> feederService = new Mock<IFeederService>();
            Mock<IUserService> userService = new Mock<IUserService>();
            Mock<RemoteLoaderFeed> remoteLoader = new Mock<RemoteLoaderFeed>();

            RSSFeeder feeder = new RSSFeeder(
                remoteLoader.Object,
                categotyService.Object,
                newsService.Object,
                feederService.Object,
                userService.Object
            );

            List<IFeedItem> news = new List<IFeedItem>
            {
                new RSSFeedItem
                {
                    Title = "test_news",
                    Description = "test_description",
                    Categories = new List<RSSFeedCategory> { new RSSFeedCategory { Value = "test_category" } }
                }
            };

            List<FeedDto> feeds = new List<FeedDto>
            {
                new FeedDto { Id = 1, Link = "first_test", LastNewsDate = DateTime.Now },
                new FeedDto { Id = 1, Link = "second_test", LastNewsDate = DateTime.Now }
            };

            feederService.Setup(a => a.GetAll()).Returns(feeds).Verifiable();

            remoteLoader.Setup(a => a.LinkIsValid(feeds[1].Link)).Returns(true).Verifiable();
            remoteLoader.Setup(a => a.LinkIsValid(feeds[0].Link)).Throws(new Exception());

            remoteLoader.Setup(a => a.GetRemoteFeed(feeds[1].Link)).Returns(news);

            await feeder.Run();
            
            remoteLoader.Verify(vl => vl.GetRemoteFeed(feeds[1].Link), Times.Once);
        }

        [TestMethod]
        public async Task When_news_not_found_Then_not_go_on()
        {
            Mock<ICategoryService> categotyService = new Mock<ICategoryService>();
            Mock<INewsService> newsService = new Mock<INewsService>();
            Mock<IFeederService> feederService = new Mock<IFeederService>();
            Mock<IUserService> userService = new Mock<IUserService>();
            Mock<RemoteLoaderFeed> remoteLoader = new Mock<RemoteLoaderFeed>();

            RSSFeeder feeder = new RSSFeeder(
                remoteLoader.Object,
                categotyService.Object,
                newsService.Object,
                feederService.Object,
                userService.Object
            );

            List<IFeedItem> news = new List<IFeedItem>
            {
                new RSSFeedItem
                {
                    Title = "test_news",
                    Description = "test_description",
                    Categories = new List<RSSFeedCategory> { new RSSFeedCategory { Value = "test_category" } }
                }
            };

            List<FeedDto> feeds = new List<FeedDto>
            {
                new FeedDto { Id = 1, Link = "first_test", LastNewsDate = DateTime.Now },
                new FeedDto { Id = 1, Link = "second_test", LastNewsDate = DateTime.Now }
            };

            feederService.Setup(a => a.GetAll()).Returns(feeds).Verifiable();

            remoteLoader.Setup(a => a.LinkIsValid(feeds[0].Link)).Returns(true).Verifiable();
            remoteLoader.Setup(a => a.LinkIsValid(feeds[1].Link)).Returns(false).Verifiable();

            remoteLoader.Setup(a => a.GetRemoteFeed(feeds[0].Link)).Returns(news);

            await feeder.Run();

            remoteLoader.Verify(vl => vl.GetRemoteFeed(feeds[0].Link), Times.Once);
            remoteLoader.Verify(vl => vl.GetRemoteFeed(feeds[1].Link), Times.Never);
        }

        [TestMethod]
        public async Task When_not_found_category_Then_no_create_empty_category()
        {
            Mock<ICategoryService> categotyService = new Mock<ICategoryService>();
            Mock<INewsService> newsService = new Mock<INewsService>();
            Mock<IFeederService> feederService = new Mock<IFeederService>();
            Mock<IUserService> userService = new Mock<IUserService>();
            Mock<RemoteLoaderFeed> remoteLoader = new Mock<RemoteLoaderFeed>();

            RSSFeeder feeder = new RSSFeeder(
                remoteLoader.Object,
                categotyService.Object,
                newsService.Object,
                feederService.Object,
                userService.Object
            );

            List<IFeedItem> news = new List<IFeedItem>();

            List<FeedDto> feeds = new List<FeedDto>
            {
                new FeedDto { Id = 1, Link = "first_test", LastNewsDate = DateTime.Now }
            };

            feederService.Setup(a => a.GetAll()).Returns(feeds).Verifiable();
            remoteLoader.Setup(a => a.LinkIsValid(feeds[0].Link)).Returns(true).Verifiable();
            remoteLoader.Setup(a => a.GetRemoteFeed(feeds[0].Link)).Returns(news);
            categotyService.Setup(a => a.GetAll()).Returns(new List<CategoryDto>());

            await feeder.Run();

            feederService.Verify();
            categotyService.Verify();
            categotyService.Verify(vl => vl.Create(It.IsAny<CategoryDto>()), Times.Never);
        }

        [TestMethod]
        public async Task When_not_found_user_then_not_added_news_in_database()
        {
            Mock<ICategoryService> categotyService = new Mock<ICategoryService>();
            Mock<INewsService> newsService = new Mock<INewsService>();
            Mock<IFeederService> feederService = new Mock<IFeederService>();
            Mock<IUserService> userService = new Mock<IUserService>();
            Mock<RemoteLoaderFeed> remoteLoader = new Mock<RemoteLoaderFeed>();

            RSSFeeder feeder = new RSSFeeder(
                remoteLoader.Object,
                categotyService.Object,
                newsService.Object,
                feederService.Object,
                userService.Object
            );

            List<FeedDto> feeds = new List<FeedDto>
            {
                new FeedDto { Id = 1, Link = "first_test", LastNewsDate = DateTime.Now }
            };

            feederService.Setup(a => a.GetAll()).Returns(feeds).Verifiable();
            remoteLoader.Setup(a => a.LinkIsValid(feeds[0].Link)).Returns(true).Verifiable();
            remoteLoader.Setup(a => a.GetRemoteFeed(feeds[0].Link)).Returns(new List<IFeedItem>()).Verifiable();
            categotyService.Setup(a => a.GetAll()).Returns(new List<CategoryDto>());
            userService.Setup(a => a.GetAllUsersIds()).Returns(new List<string>());

            await feeder.Run();

            remoteLoader.Verify();
            feederService.Verify();
            newsService.Verify(vl => vl.AddRange(It.IsAny<List<NewsDto>>()), Times.Never);
        }

        [TestMethod]
        public async Task When_not_found_new_news_Then_not_added_news_in_db()
        {
            Mock<ICategoryService> categotyService = new Mock<ICategoryService>();
            Mock<INewsService> newsService = new Mock<INewsService>();
            Mock<IFeederService> feederService = new Mock<IFeederService>();
            Mock<IUserService> userService = new Mock<IUserService>();
            Mock<RemoteLoaderFeed> remoteLoader = new Mock<RemoteLoaderFeed>();

            RSSFeeder feeder = new RSSFeeder(
                remoteLoader.Object,
                categotyService.Object,
                newsService.Object,
                feederService.Object,
                userService.Object
            );
            
            List<FeedDto> feeds = new List<FeedDto>
            {
                new FeedDto { Id = 1, Link = "first_test", LastNewsDate = DateTime.Now }
            };

            List<string> usersId = new List<string>
            {
                Guid.NewGuid().ToString(),
                Guid.NewGuid().ToString()
            };

            feederService.Setup(a => a.GetAll()).Returns(feeds).Verifiable();
            remoteLoader.Setup(a => a.LinkIsValid(feeds[0].Link)).Returns(true).Verifiable();
            remoteLoader.Setup(a => a.GetRemoteFeed(feeds[0].Link)).Returns(new List<IFeedItem>()).Verifiable();
            categotyService.Setup(a => a.GetAll()).Returns(new List<CategoryDto>()).Verifiable();
            userService.Setup(a => a.GetAllUsersIds()).Returns(usersId).Verifiable();
            
            await feeder.Run();

            feederService.Verify();
            remoteLoader.Verify();
            categotyService.Verify();
            userService.Verify();
            newsService.Verify(vl => vl.AddRange(It.IsAny<List<NewsDto>>()), Times.Never);
        }
    }
}
