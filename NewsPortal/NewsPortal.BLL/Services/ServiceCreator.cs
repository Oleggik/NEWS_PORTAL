using AutoMapper;
using NewsPortal.DAL.Repositories;
using NewsPortal.BLL.Interfaces;
using NewsPortal.BLL.MessageQueue;
using NewsPortal.DAL.EF;

namespace NewsPortal.BLL.Services
{
    public class ServiceCreator : IServiceCreator
    {
        private readonly ApplicationContext _context;
        private readonly ISenderToQueueElasticUpdate _senderToQueueElastic;
        private readonly IMapper _mapper;

        public ServiceCreator(ApplicationContext context, IMapper mapper, ISenderToQueueElasticUpdate senderToQueueElastic = null)
        {
            _context = context;
            _mapper = mapper;
            _senderToQueueElastic = senderToQueueElastic;
        }

        public IUserService CreateUserService(string connection)
        {
            return new UserService(CreateUnitOfWork(connection));
        }

        public IFeederService CreateFeederService(string connection)
        {
            return new FeederService(CreateUnitOfWork(connection), _mapper);
        }

        public INewsService CreateNewsService(string connection)
        {
            return new NewsService(CreateUnitOfWork(connection), _mapper, _senderToQueueElastic);
        }

        public ICategoryService CreateCategorieService(string connection)
        {
            return new CategoryService(CreateUnitOfWork(connection), _mapper, _senderToQueueElastic);
        }

        public IdentityUnitOfWork CreateUnitOfWork(string connection)
        {
            return new IdentityUnitOfWork(_context, connection);
        }
    }
}
