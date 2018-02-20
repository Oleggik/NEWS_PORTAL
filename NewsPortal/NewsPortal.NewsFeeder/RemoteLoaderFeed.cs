using System.Collections.Generic;
using Suyati.FeedAggreagator;

namespace NewsPortal.NewsFeeder
{
    public class RemoteLoaderFeed
    {
        public virtual bool LinkIsValid(string link)
        {
            return SyndicationFeed.IsValidFeed(link);
        }

        public virtual IEnumerable<IFeedItem> GetRemoteFeed(string link)
        {
            SyndicationFeed syndicationFeed = SyndicationFeed.Load(link);
            return syndicationFeed.Feed.Items;
        }
    }
}
