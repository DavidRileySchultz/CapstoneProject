using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace CapstoneProject.Models
{
    public class Group
    {
        [Key]
        public int Id { get; set; }
        [Display(Name = "Group Author")]
        public string Name { get; set; }
        public string GroupName { get; set; }

        public ICollection<GroupTraveller> GroupTravellers { get; set; }
    }
}