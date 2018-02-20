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
    public class CategoryController : ApiController
    {
        private readonly ICategoryService _categoryService;
        private readonly IMapper _mapper;

        public CategoryController(ICategoryService categoryService, IMapper mapper)
        {
            _categoryService = categoryService;
            _mapper = mapper;
        }

        [AllowAnonymous]
        public virtual async Task<PageResult<CategoryDto>> Get(ODataQueryOptions<CategoryDto> queryOptions)
        {
            var dataQuerySettings = new ODataQuerySettings();
            var items = _categoryService.Query();
            IQueryable results = queryOptions.ApplyTo(items.ProjectTo<CategoryDto>(), dataQuerySettings);

            var list = await Task.Factory.StartNew(() => results as IEnumerable<CategoryDto>);
            return new PageResult<CategoryDto>(list, Request.ODataProperties().NextLink, Request.ODataProperties().TotalCount);
        }

        public async Task<IHttpActionResult> Post(CreateCategory item)
        {
            if (ModelState.IsValid)
            {
                CategoryDto category = _mapper.Map<CreateCategory, CategoryDto>(item);
                category = await _categoryService.Create(category);
                return Ok(category);
            }

            return BadRequest(ModelState);
        }

        public async Task<IHttpActionResult> Delete([Required]int id)
        {
            if (ModelState.IsValid)
            {
                CategoryDto category = await _categoryService.Remove(id);
                return Ok(category);
            }

            return BadRequest(ModelState);
        }

        [Authorize(Roles = "admin")]
        public async Task<IHttpActionResult> Put(EditCategory item)
        {
            if (ModelState.IsValid)
            {
                CategoryDto category = await _categoryService.Update(_mapper.Map<EditCategory, CategoryDto>(item));
                return Ok(category);
            }

            return BadRequest(ModelState);
        }
    }
}