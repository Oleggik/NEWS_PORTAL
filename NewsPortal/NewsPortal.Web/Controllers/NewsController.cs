using AutoMapper;
using AutoMapper.QueryableExtensions;
using NewsPortal.BLL.DTO;
using NewsPortal.BLL.Interfaces;
using NewsPortal.Web.Models;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.OData;
using System.Web.Http.OData.Extensions;
using System.Web.Http.OData.Query;

namespace NewsPortal.Web.Controllers
{
    [Authorize]
    public class NewsController : ApiController
    {
        private readonly INewsService _newsService;
        private readonly IUserService _userService;
        private readonly IMapper _mapper;

        public NewsController(INewsService newsService, IUserService userService, IMapper mapper)
        {
            _newsService = newsService;
            _userService = userService;
            _mapper = mapper;
        }

        [AllowAnonymous]
        public virtual async Task<PageResult<FullInfoNews>> Get(ODataQueryOptions<FullInfoNews> queryOptions)
        {
            var dataQuerySettings = new ODataQuerySettings();
            var items = _newsService.Query();
            IQueryable results = queryOptions.ApplyTo(items.ProjectTo<FullInfoNews>(), dataQuerySettings);

            var list = await Task.Factory.StartNew(() => results as IEnumerable<FullInfoNews>);
            return new PageResult<FullInfoNews>(list, Request.ODataProperties().NextLink, Request.ODataProperties().TotalCount);
        }

        public async Task<IHttpActionResult> Put(EditNews item)
        {
            if (ModelState.IsValid)
            {
                NewsDto news = await _newsService.Update(_mapper.Map<EditNews, NewsDto>(item));
                return Ok(news);
            }

            return BadRequest(ModelState);
        }

        public async Task<IHttpActionResult> Delete([Required]int id)
        {
            if (ModelState.IsValid)
            {
                NewsDto news = await _newsService.Remove(id);
                return Ok(news);
            }

            return BadRequest(ModelState);
        }

        public async Task<IHttpActionResult> Post(CreateNews item)
        {
            if (ModelState.IsValid)
            {
                NewsDto newNews = _mapper.Map<CreateNews, NewsDto>(item);
                newNews.ApplicationUserId = (await _userService.GetUserId(User.Identity.Name));
                NewsDto news = await _newsService.Create(newNews);
                return Ok(news);
            }

            return BadRequest(ModelState);
        }
    }
}