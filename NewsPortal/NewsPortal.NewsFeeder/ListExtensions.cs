using System.Collections.Generic;

namespace NewsPortal.NewsFeeder
{
    public static class ListExtensions
    {
        public static IEnumerable<List<T>> SplitList<T>(this List<T> collection, int batchSize) where T : class
        {
            List<T> chunk = new List<T>();
            int start = 0;
            
            while (start < collection.Count)
            {
                chunk.Clear();
                int count = (start + batchSize < collection.Count) ? batchSize : collection.Count - start;
                chunk.AddRange(collection.GetRange(start, count));
                start += count;
                yield return chunk;
            }
        }
    }
}