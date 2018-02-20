using NewsPortal.Web.Attributes;
using System;
using System.ComponentModel.DataAnnotations;

namespace NewsPortal.Web.Models
{
    public class CreateNews
    {
        [Required]
        [UniqueTitleNews(ErrorMessage = "Not unique news title!")]
        public string Title { get; set; }
        [Required]
        public string Body { get; set; }
        [Required]
        public string Description { get; set; }
        [Required]
        public bool Published { get; set; }
        [Required]
        public DateTime CreatedDate { get; set; }
        [Required(ErrorMessage = "Category is required")]
        public int CategoryId { get; set; }
    }
}