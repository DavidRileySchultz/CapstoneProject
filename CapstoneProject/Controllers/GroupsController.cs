using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CapstoneProject.Models;
using CapstoneProject.ViewModels;
using CapstoneProject.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CapstoneProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GroupsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        public GroupsController(ApplicationDbContext context)
        {
            _context = context;
        }


        // POST: api/Groups
        [HttpPost("[action]")]
        public async Task<IActionResult> Create([FromBody] GroupVM data)
        {
            if (data != null)
            {
                try
                {
                    Group group = new Group();
                    group.Name = data.name;
                    group.GroupName = data.groupName;
                    group.Id = data.groupId;
                    _context.Groups.Add(group);
                    await _context.SaveChangesAsync();
                    int thisGroupId = FindGroupIdByName(data.name);
                    return Ok();
                }
                catch
                {
                    throw new System.Web.Http.HttpResponseException(System.Net.HttpStatusCode.InternalServerError);
                }
            }
            else
            {
                return NoContent();
            }
        }

        private int FindGroupIdByName(string name)
        {
            var thisGroup = _context.Groups.Where(a => a.Name == name).ToList();
            if (thisGroup.Count() > 1)
            {
                thisGroup = thisGroup.OrderByDescending(a => a.Id).ToList();
            }
            int thisGroupId = thisGroup[0].Id;
            return thisGroupId;
        }
    }
}