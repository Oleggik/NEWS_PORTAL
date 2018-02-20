using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NewsPortal.DAL.Entities
{
    public class CategoryElastic
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int CountNews { get; set; }
    }
}
