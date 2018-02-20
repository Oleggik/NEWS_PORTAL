using System.ComponentModel.DataAnnotations;

namespace NewsPortal.Web.Models
{
    public class RegisterModel
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }
        [Required]
        [RegularExpression(@".{8,}", ErrorMessage = "Invalid password!")]
        public string Password { get; set; }
        [Required]
        public string Address { get; set; }
        [Required]
        public string Name { get; set; }
    }
}