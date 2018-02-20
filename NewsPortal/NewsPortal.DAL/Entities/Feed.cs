using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace NewsPortal.DAL.Entities
{
    public class Feed
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required]
        public string Link { get; set; }

        public DateTime? LastNewsDate { get; set; } 
    }
}
