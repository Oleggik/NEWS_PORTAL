using NewsPortal.DAL.Interfaces;
using System;
using System.Collections.Generic;
using NewsPortal.DAL.Entities;
using Elasticsearch.Net;
using System.Web.Script.Serialization;

namespace NewsPortal.DAL.Repositories
{
    public class ElasticRepository : IElasticRepository
    {
        private readonly IElasticLowLevelClient _elasticClient;

        public ElasticRepository(IElasticLowLevelClient elasticClient)
        {
            _elasticClient = elasticClient;
        }

        public ResultSetFromElastic GetNewsFromBody(object body)
        {
            ResultSetFromElastic news = new ResultSetFromElastic();

            string response = SendNewsRequest(body);

            dynamic responseJson = new JavaScriptSerializer().DeserializeObject(response);
            news.Total = responseJson["hits"]["total"];
            dynamic elementsWithMetaData = responseJson["hits"]["hits"];

            foreach (var element in elementsWithMetaData)
            {
                news.Data.Add(MapNewsFromElasticResponse(element["_source"]));
            }

            return news;
        }

        public List<CategoryElastic> GetCategoriesFromBody(object body)
        {
            List<CategoryElastic> categories = new List<CategoryElastic>();

            string response = SendCategoryRequest(body);

            dynamic responseJson = new JavaScriptSerializer().DeserializeObject(response);
            dynamic elementsWithMetaData = responseJson["hits"]["hits"];

            foreach (var element in elementsWithMetaData)
            {
                categories.Add(MapCategoryFromElasticResponse(element["_source"]));
            }

            return categories;
        }

        private string SendNewsRequest(object body)
        {
            return _elasticClient.Search<StringResponse>("fullinfonewss", "fullinfonews", PostData.Serializable(body)).Body;
        }

        private string SendCategoryRequest(object body)
        {
            return _elasticClient.Search<StringResponse>("categoryforelastics", "categoryforelastic", PostData.Serializable(body)).Body;
        }

        private NewsForElastic MapNewsFromElasticResponse(dynamic item)
        {
            NewsForElastic news = new NewsForElastic
            {
                Id = Convert.ToInt32(item["id"]),
                CategoryName = item["categoryname"],
                ApplicationUserId = item["applicationuserid"],
                CreatedDate = DateTime.Parse(item["createddate"]),
                Title = item["title"],
                Description = item["description"],
                Published = Convert.ToBoolean(item["published"]),
                Body = item["body"],
                CategoryId = Convert.ToInt32(item["categoryid"]),
                UserName = item["username"]
            };

            return news;
        }

        private CategoryElastic MapCategoryFromElasticResponse(dynamic item)
        {
            CategoryElastic category = new CategoryElastic
            {
                Id = Convert.ToInt32(item["id"]),
                Name = item["name"],
                CountNews = Convert.ToInt32(item["countnews"])
            };

            return category;
        }
    }
}
