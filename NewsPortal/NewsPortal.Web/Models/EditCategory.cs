using System.ComponentModel.DataAnnotations;

namespace NewsPortal.Web.Models
{
    public class EditCategory
    {
        [Required]
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public bool Active { get; set; }
    }
}