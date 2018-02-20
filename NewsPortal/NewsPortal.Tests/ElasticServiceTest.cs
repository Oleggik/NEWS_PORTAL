using AutoMapper;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using NewsPortal.BLL.DTO;
using NewsPortal.BLL.Services;
using NewsPortal.DAL.Interfaces;
using NewsPortal.Web.Util;

namespace NewsPortal.Tests
{
    [TestClass]
    public class ElasticServiceTest
    {
        [ClassInitialize]
        public static void Initialize(TestContext context)
        {
            Mapper.Reset();
            AutomapperConfiguration.Configure();
        }

        [TestMethod]
        public void When_get_null_value_Then_return_null_items()
        {
            Mock<IElasticRepository> elastic = new Mock<IElasticRepository>();
            Mock<IMapper> mapper = new Mock<IMapper>();

            ElasticService service = new ElasticService(elastic.Object, mapper.Object);

            NewsFromElastic result = service.GetNewsBySearchTerm(string.Empty, It.IsAny<int>(), It.IsAny<int>());

            Assert.AreEqual(result.Data.Count, 0);
        }

        [TestMethod]
        public void When_get_null_category_Then_return_null_items()
        {
            Mock<IElasticRepository> elastic = new Mock<IElasticRepository>();
            Mock<IMapper> mapper = new Mock<IMapper>();

            ElasticService service = new ElasticService(elastic.Object, mapper.Object);

            NewsFromElastic result = service.GetNewsByCategory(string.Empty, It.IsAny<int>(), It.IsAny<int>());

            Assert.AreEqual(result.Data.Count, 0);
        }

        [TestMethod]
        public void When_get_null_category_but_not_null_value_Then_return_null_items()
        {
            Mock<IElasticRepository> elastic = new Mock<IElasticRepository>();
            Mock<IMapper> mapper = new Mock<IMapper>();

            ElasticService service = new ElasticService(elastic.Object, mapper.Object);

            NewsFromElastic result = service.GetByCategoryAndSearchTerm(string.Empty, "test", It.IsAny<int>(), It.IsAny<int>());

            Assert.AreEqual(result.Data.Count, 0);
        }

        [TestMethod]
        public void When_get_category_not_null_but_value_null_Then_return_null_items()
        {
            Mock<IElasticRepository> elastic = new Mock<IElasticRepository>();
            Mock<IMapper> mapper = new Mock<IMapper>();

            ElasticService service = new ElasticService(elastic.Object, mapper.Object);

            NewsFromElastic result = service.GetByCategoryAndSearchTerm("test", string.Empty, It.IsAny<int>(), It.IsAny<int>());

            Assert.AreEqual(result.Data.Count, 0);
        }

        [TestMethod]
        public void When_get_category_null_and_value_null_Then_return_null_items()
        {
            Mock<IElasticRepository> elastic = new Mock<IElasticRepository>();
            Mock<IMapper> mapper = new Mock<IMapper>();

            ElasticService service = new ElasticService(elastic.Object, mapper.Object);

            NewsFromElastic result = service.GetByCategoryAndSearchTerm(string.Empty, string.Empty, It.IsAny<int>(), It.IsAny<int>());

            Assert.AreEqual(result.Data.Count, 0);
        }
    }
}
