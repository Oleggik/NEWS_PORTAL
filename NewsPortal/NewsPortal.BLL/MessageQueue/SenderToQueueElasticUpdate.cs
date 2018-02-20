using System.Threading.Tasks;
using NServiceBus;
using NewsPortal.MessagesNewsToElastic;

namespace NewsPortal.BLL.MessageQueue
{
    public class SenderToQueueElasticUpdate : ISenderToQueueElasticUpdate
    {
        private readonly EndpointConfiguration _endPoint;
        private readonly TransportExtensions<LearningTransport> _transport;
        private readonly RoutingSettings<LearningTransport> _routing;
        private readonly string _messageQueueName;

        public SenderToQueueElasticUpdate(EndpointConfiguration endPoint, string messageQueueName)
        {
            _endPoint = endPoint;
            _transport = _endPoint.UseTransport<LearningTransport>();
            _routing = _transport.Routing();
            _messageQueueName = messageQueueName;
        }

        public async Task AddOrUpdateElasticNews(NewsUpdateOrCreateCommand newsUpdateOrCreate)
        {
            _routing.RouteToEndpoint(typeof(NewsUpdateOrCreateCommand), _messageQueueName);
            var endpointInstance = await Endpoint.Start(_endPoint).ConfigureAwait(false);
            await endpointInstance.Send(newsUpdateOrCreate).ConfigureAwait(false);
            await endpointInstance.Stop().ConfigureAwait(false);
        }

        public async Task DeleteNewsFromElastic(int id)
        {
            _routing.RouteToEndpoint(typeof(NewsDeleteCommand), _messageQueueName);
            var endpointInstance = await Endpoint.Start(_endPoint).ConfigureAwait(false);
            await endpointInstance.Send(new NewsDeleteCommand { Id = id}).ConfigureAwait(false);
            await endpointInstance.Stop().ConfigureAwait(false);
        }

        public async Task DeleteCategoryFromElastic(int id)
        {
            _routing.RouteToEndpoint(typeof(RemoveCategoryCommand), _messageQueueName);
            var endpointInstance = await Endpoint.Start(_endPoint).ConfigureAwait(false);
            await endpointInstance.Send(new RemoveCategoryCommand { Id = id }).ConfigureAwait(false);
            await endpointInstance.Stop().ConfigureAwait(false);
        }

        public async Task UpdateElasticCategories(UpdateCategoriesInfoCommand categories)
        {
            _routing.RouteToEndpoint(typeof(UpdateCategoriesInfoCommand), _messageQueueName);
            var endpointInstance = await Endpoint.Start(_endPoint).ConfigureAwait(false);
            await endpointInstance.Send(categories).ConfigureAwait(false);
            await endpointInstance.Stop().ConfigureAwait(false);
        }
    }
}
