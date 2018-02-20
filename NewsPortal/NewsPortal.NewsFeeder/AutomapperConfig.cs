using AutoMapper;
using NewsPortal.BLL.DTO;
using NewsPortal.DAL.Entities;
using Suyati.FeedAggreagator;

namespace NewsPortal.NewsFeeder
{
    public static class AutomapperConfig
    {
        public static void Configure()
        {
            Mapper.Initialize(cfg =>
            {
                cfg.AddProfile(new AutoMapperProfile());
            });
        }
    }

    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<NewsDto, News>().ReverseMap();

            CreateMap<CategoryDto, Category>().ReverseMap();

            CreateMap<FullInfoNews, NewsForElastic>()
                .ReverseMap();

            CreateMap<ResultSetFromElastic, NewsFromElastic>()
                .ReverseMap();

            CreateMap<IFeedItem, NewsFromFeed>()
                .ForMember(dto => dto.Title, opt => opt.MapFrom(src => src.Title))
                .ForMember(dto => dto.Body, opt => opt.MapFrom(src => src.Description))
                .ForMember(dto => dto.Description, opt => opt.MapFrom(src => src.Description))
                .ForMember(dto => dto.CategoryName, opt => opt.MapFrom(src => ((RSSFeedItem)src).Categories[0].Value));

            CreateMap<NewsFromFeed, NewsDto>()
                .ForMember(dto => dto.CreatedDate, opt => opt.MapFrom(src => src.PublishedDate))
                .ForMember(dto => dto.Published, opt => opt.MapFrom(src => true));
        }
    }
}
