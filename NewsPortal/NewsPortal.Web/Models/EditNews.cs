using System;
using System.ComponentModel.DataAnnotations;

namespace NewsPortal.Web.Models
{
    public class EditNews
    {
        [Required]
        public int Id { get; set; }
        [Required]
        public string Title { get; set; }
        [Required]
        public string Body { get; set; }
        [Required]
        public string Description { get; set; }
        [Required]
        public DateTime CreatedDate { get; set; }
        [Required]
        public bool Published { get; set; }
        [Required]
        public string ApplicationUserId { get; set; }
        [Required(ErrorMessage = "Category is required")]
        public int CategoryId { get; set; }
    }
}