using AutoMapper;
using Microsoft.Owin.Security;
using NewsPortal.BLL.DTO;
using NewsPortal.BLL.Infastructure;
using NewsPortal.BLL.Interfaces;
using NewsPortal.Web.Models;
using System.Security.Claims;
using System.Threading.Tasks;
using System.Web.Http;

namespace NewsPortal.Web.Controllers
{
    public class AuthController : ApiController
    {
        private readonly IUserService _userService;
        private readonly IAuthenticationManager _authenticationManager;
        private readonly IMapper _mapper;
        
        public AuthController(IUserService userService, IAuthenticationManager authMngr, IMapper mapper)
        {
            _userService = userService;
            _authenticationManager = authMngr;
            _mapper = mapper;
        }

        [HttpGet]
        [Route("api/auth/isauntificated")]
        public bool IsAuntificated()
        {
            return User.Identity.IsAuthenticated;
        }

        [HttpGet]
        [Route("api/auth/isinrole")]
        public bool IsInRole(string roleName)
        {
            return User.IsInRole(roleName);
        }

        [HttpPost]
        [Route("api/auth/login")]
        public async Task<IHttpActionResult> Login(LoginModel item)
        {
            if (ModelState.IsValid)
            {
                UserDto newUser = _mapper.Map<LoginModel, UserDto>(item);
                ClaimsIdentity claim = await _userService.Authenticate(newUser);
                if (claim == null)
                {
                    return NotFound();
                }

                _authenticationManager.SignOut();
                _authenticationManager.SignIn(new AuthenticationProperties { IsPersistent = true }, claim);
                return Ok();
            }

            return BadRequest(ModelState);
        }

        [HttpGet]
        [Route("api/auth/logout")]
        public IHttpActionResult Logout()
        {
            _authenticationManager.SignOut();
            return Ok();
        }

        [HttpPost]
        [Route("api/auth/register")]
        public async Task<IHttpActionResult> Register(RegisterModel model)
        {
            if (ModelState.IsValid)
            {
                UserDto userDto = _mapper.Map<RegisterModel, UserDto>(model);
                userDto.Role = "admin";
                OperationDetails operationDetails = await _userService.Create(userDto);
                if (operationDetails.Succedeed)
                {
                    return Ok();
                }

            }

            return BadRequest(ModelState);
        }
    }
}