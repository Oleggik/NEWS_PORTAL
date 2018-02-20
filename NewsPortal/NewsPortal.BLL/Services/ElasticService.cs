using System.Collections.Generic;
using NewsPortal.BLL.DTO;
using NewsPortal.BLL.Interfaces;
using NewsPortal.DAL.Interfaces;
using AutoMapper;
using NewsPortal.DAL.Entities;

namespace NewsPortal.BLL.Services
{
    public class ElasticService : IElasticService
    {
        private readonly IElasticRepository _elastic;
        private readonly IMapper _mapper;

        public ElasticService(IElasticRepository elastic, IMapper mapper)
        {
            _elastic = elastic;
            _mapper = mapper;
        }

        public NewsFromElastic GetNewsWithPaging(int skip, int top)
        {
            var body = new
            {
                from = skip,
                size = top
            };

            return _mapper.Map<ResultSetFromElastic, NewsFromElastic>(_elastic.GetNewsFromBody(body));
        }

        public NewsFromElastic GetNewsBySearchTerm(string searchTerm, int skip, int top)
        {
            if (!string.IsNullOrEmpty(searchTerm))
            {
                var body = new
                {
                    query = new
                    {
                        multi_match = new
                        {
                            fields = new[] { "title", "body", "username", "description", "categoryname" },
                            query = searchTerm
                        }
                    },
                    from = skip,
                    size = top
                };

                return _mapper.Map<ResultSetFromElastic, NewsFromElastic>(_elastic.GetNewsFromBody(body));
            }

            return new NewsFromElastic();
        }

        public NewsFromElastic GetNewsByCategory(string category, int skip, int top)
        {
            if (!string.IsNullOrEmpty(category))
            {
                var body = new
                {
                    from = skip,
                    size = top,
                    query = new
                    {
                        multi_match = new
                        {
                            fields = new[] { "categoryname" },
                            query = category
                        }
                    }
                };

                return _mapper.Map<ResultSetFromElastic, NewsFromElastic>(_elastic.GetNewsFromBody(body));
            }

            return new NewsFromElastic();
        }

        public NewsFromElastic GetByCategoryAndSearchTerm(string category, string searchTerm, int skip, int top)
        {
            if (!(string.IsNullOrEmpty(category) || string.IsNullOrEmpty(searchTerm)))
            {
                var body = new
                {
                    query = new
                    {
                        @bool = new
                        {
                            must = new object[]
                            {
                                new {
                                    match = new
                                    {
                                        categoryname = category
                                    }
                                },
                                new {
                                    multi_match = new
                                    {
                                        fields = new[] { "title", "body", "username", "description"},
                                        query = searchTerm
                                    }
                                }
                            }
                        }
                    },

                    from = skip,
                    size = top
                };
                
                return _mapper.Map<ResultSetFromElastic, NewsFromElastic>(_elastic.GetNewsFromBody(body));
            }

            return new NewsFromElastic();
        }

        public List<CategoryForElastic> GetCategories()
        {
            var body = new
            {
                from = 0,
                size = 10000
            };

            return _mapper.Map<List<CategoryElastic>, List<CategoryForElastic>>(_elastic.GetCategoriesFromBody(body));
        }
    }
}