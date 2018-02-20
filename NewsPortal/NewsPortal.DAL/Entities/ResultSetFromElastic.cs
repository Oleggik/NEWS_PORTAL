using System.Collections.Generic;

namespace NewsPortal.DAL.Entities
{
    public class ResultSetFromElastic
    {
        public List<NewsForElastic> Data { get; set; }
        public int Total { get; set; }

        public ResultSetFromElastic()
        {
            Data = new List<NewsForElastic>();
        }
    }
}
