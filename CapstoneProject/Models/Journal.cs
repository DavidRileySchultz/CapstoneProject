using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace CapstoneProject.Models
{
    public class Journal
    {
        [Key]
        public int Id { get; set; }
        [Display(Name="Enter your name:")]
        public string Name { get; set; }
        public string Title { get; set; }
        [Display(Name = "Entry")]
        public string Content { get; set; }
        [Display(Name = "Date Published")]
        public DateTime PubDate { get; set; }

        public ICollection<TravellerJournal> TravellerJournals { get; set; }
    }
}
