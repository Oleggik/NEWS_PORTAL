using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using NewsPortal.BLL.DTO;
using NewsPortal.BLL.Interfaces;
using NewsPortal.DAL.Entities;
using NewsPortal.DAL.Interfaces;

namespace NewsPortal.BLL.Services
{
    public class FeederService : IFeederService
    {
        private readonly IUnitOfWork _database;
        private readonly IMapper _mapper;

        public FeederService(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _database = unitOfWork;
            _mapper = mapper;
        }

        public async Task<FeedDto> Create(FeedDto item)
        {
            Feed feed = await _database.FeedRepository.Create(_mapper.Map<FeedDto, Feed>(item));
            return _mapper.Map<Feed, FeedDto>(feed);
        }

        public async Task<FeedDto> GetById(int id)
        {
            Feed feed = await _database.FeedRepository.GetById(id);
            return _mapper.Map<Feed, FeedDto>(feed);
        }

        public async Task<FeedDto> Remove(int id)
        {
            Feed feed = await _database.FeedRepository.Remove(id);
            return _mapper.Map<Feed, FeedDto>(feed);
        }

        public async Task<FeedDto> Update(FeedDto item)
        {
            Feed fedd = await _database.FeedRepository.Update(_mapper.Map<FeedDto, Feed>(item));
            return _mapper.Map<Feed, FeedDto>(fedd);
        }

        public List<FeedDto> GetAll()
        {
            List<FeedDto> feeds = _mapper.Map<List<Feed>, List<FeedDto>>(_database.FeedRepository.GetAll());
            return feeds;
        }
    }
}
