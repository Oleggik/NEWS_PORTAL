using NewsPortal.Web.Attributes;
using System.ComponentModel.DataAnnotations;

namespace NewsPortal.Web.Models
{
    public class CreateCategory
    {
        [Required]
        [UniqueCategoryName(ErrorMessage = "Not unique name for category!")]
        public string Name { get; set; }
        [Required]
        public bool Active { get; set; }
    }
}