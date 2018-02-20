using AutoMapper;
using NewsPortal.BLL.DTO;
using NewsPortal.DAL.Entities;
using NewsPortal.Web.Models;
using System.Collections.Generic;
using System.Linq;

namespace NewsPortal.Web.Util
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<UserDto, LoginModel>()
                .ReverseMap();

            CreateMap<RegisterModel, UserDto>()
                .ReverseMap();


            CreateMap<Category, CategoryDto>()
                .ReverseMap();

            CreateMap<News, NewsDto>()
                .ReverseMap();

            CreateMap<CreateCategory, CategoryDto>()
                .ReverseMap();

            CreateMap<CreateNews, NewsDto>()
                .ReverseMap();

            CreateMap<EditNews, NewsDto>()
                .ReverseMap();

            CreateMap<EditCategory, CategoryDto>()
                .ReverseMap();

            CreateMap<NewsDto, News>()
                .ReverseMap();

            CreateMap<FullInfoNews, NewsForElastic>()
                .ReverseMap();

            CreateMap<ResultSetFromElastic, NewsFromElastic>()
                .ReverseMap();

            CreateMap<CategoryElastic, CategoryForElastic>()
                .ReverseMap();

            CreateMap<News, FullInfoNews>()
                .ForMember(dto => dto.UserName, opt => opt.MapFrom(src => src.ApplicationUser.ClientProfile.Name))
                .ForMember(dto => dto.CategoryName, opt => opt.MapFrom(src => src.Category.Name))
                .ReverseMap();

            CreateMap<IQueryable<News>, List<FullInfoNews>>();
        }
    }
}