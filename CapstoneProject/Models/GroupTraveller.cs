using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace CapstoneProject.Models
{
    public class GroupTraveller
    {
       
        public int TravellerId { get; set; }
        public Traveller Traveller { get; set; }

        
        public int GroupId { get; set; }
        public Group Group { get; set; }
    }
}
