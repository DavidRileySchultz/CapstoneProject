using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CapstoneProject.Models
{
    public class TravellerJournal
    {

        public int TravellerId { get; set; }
        public Traveller Traveller { get; set; }


        public int JournalId { get; set; }
        public Journal Journal { get; set; }
    }
}
