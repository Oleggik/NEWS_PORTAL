using System.Collections.Generic;

namespace NewsPortal.BLL.DTO
{
    public class NewsFromElastic
    {
        public List<FullInfoNews> Data { get; set; }
        public int Total { get; set; }

        public NewsFromElastic()
        {
            Data = new List<FullInfoNews>();
        }
    }
}
