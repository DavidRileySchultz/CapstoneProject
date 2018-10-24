using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CapstoneProject.ViewModels
{
    public class GroupVM
    {
        public string name { get; set; }

        public string groupName { get; set; }

        public int[] members { get; set; }

        public int userId { get; set; }

        public string owner { get; set; }

        public string[] travellerNames { get; set; }

        public int groupId { get; set; }

    }
}