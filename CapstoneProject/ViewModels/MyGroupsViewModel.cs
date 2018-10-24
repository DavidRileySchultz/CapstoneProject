using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CapstoneProject.ViewModels
{
    public class MyGroupsViewModel
    {
        public string Name { get; set; }

        public int Id { get; set; }
    }

    public class MyGroupsViewModels
    {
        public List<MyGroupsViewModel> groupsIn { get; set; }
        public List<MyGroupsViewModel> groupsOwn { get; set; }
    }
}
