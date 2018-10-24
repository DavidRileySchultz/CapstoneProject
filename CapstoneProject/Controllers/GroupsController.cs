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
        public async Task<IActionResult> Create([FromBody] GroupViewModel data)
        {
            if (data != null)
            {
                try
                {
                    Group group = new Group();
                    group.Name = data.name;
                    group.GroupName = data.groupName;
                    group.Id = data.travellerId;
                    _context.Groups.Add(group);
                    await _context.SaveChangesAsync();
                    int thisGroupId = FindGroupIdByName(data.name);
                    CreateNewGroupMembers(thisGroupId, data.members);
                    AddOrganizerAsMember(thisGroupId, data.travellerId);
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

        private void AddOrganizerAsMember(int groupId, int memberId)
        {
            GroupMember groupMember = new GroupMember();
            groupMember.GroupId = groupId;
            groupMember.TravellerId = memberId;
            _context.GroupMembers.Add(groupMember);
            _context.SaveChanges();
        }

        private void CreateNewGroupMembers(int id, int[] memberIds)
        {
            foreach (int memberId in memberIds)
            {
                GroupMember groupMember = new GroupMember();
                groupMember.GroupId = id;
                groupMember.TravellerId = memberId;
                _context.GroupMembers.Add(groupMember);
                _context.SaveChanges();
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

        [HttpGet("[action]")]
        public MyGroupsViewModels GetGroups(int id)
        {
            var groups = GetGroupsByTravellerId(id);
            List<MyGroupsViewModel> groupsIn = CreateGroupsInSnapshotForClient(groups);
            List<MyGroupsViewModel> ownGroups = GetGroupsOwned(id);
            MyGroupsViewModels all = new MyGroupsViewModels();
            all.groupsIn = groupsIn;
            all.groupsOwn = ownGroups;
            return all;
        }

        private List<MyGroupsViewModel> CreateGroupsInSnapshotForClient(List<Group> groups)
        {
            List<MyGroupsViewModel> snapshots = new List<MyGroupsViewModel>();
            foreach (Group group in groups)
            {
                MyGroupsViewModel snapshot = new MyGroupsViewModel();
                snapshot.Id = group.Id;
                snapshot.Name = group.Name;
                snapshots.Add(snapshot);
            }
            return snapshots;
        }

        private List<Group> GetGroupsByTravellerId(int id)
        {
            return _context.GroupMembers.Where(a => a.TravellerId == id)
                .Join(_context.Groups, a => a.GroupId, b => b.Id, (a, b) => new { a, b })
                .Select(c => c.b).ToList();
        }

        [HttpGet("[action]")]
        public GroupViewModel GetGroupDetails(int id)
        {
            var group = _context.Groups.Find(id);
            GroupViewModel data = new GroupViewModel();
            data.name = group.Name;
            data.groupName = group.GroupName;
            data.travellerId = group.Id;
            string ownerFirstName = _context.Travellers.Find(group.Id).FirstName;
            string ownerLastName = _context.Travellers.Find(group.Id).LastName;
            data.name = $"{ownerFirstName} {ownerLastName}";
            data.members = _context.GroupMembers.Where(a => a.GroupId == id).Select(a => a.TravellerId).ToArray();
            data.memberNames = GetMemberNames(id);
            return data;
        }

        private string[] GetMemberNames(int groupId)
        {
            var members = _context.GroupMembers.Where(a => a.GroupId == groupId).Join(_context.Travellers, a => a.TravellerId, b => b.Id, (a, b) => new { a, b }).Select(c => c.b).ToList();
            List<string> memberNames = new List<string>();
            foreach (Traveller member in members)
            {
                string name = $"{member.FirstName} {member.LastName}";
                memberNames.Add(name);
            }
            return memberNames.ToArray();
        }

        public List<MyGroupsViewModel> GetGroupsOwned(int id)
        {
            var groups = _context.Groups.Where(a => a.Id == id).ToList();
            List<MyGroupsViewModel> snapshots = new List<MyGroupsViewModel>();
            foreach (Group group in groups)
            {
                MyGroupsViewModel snapshot = new MyGroupsViewModel();
                snapshot.Id = group.Id;
                snapshot.Name = group.Name;
                snapshots.Add(snapshot);
            }
            return snapshots;
        }

        [HttpPost("[action]")]
        public IActionResult DeleteMember(int userId, int groupId)
        {
            var member = _context.GroupMembers.SingleOrDefault(a => a.TravellerId == userId && a.GroupId == groupId);
            if (member != null)
            {
                _context.GroupMembers.Remove(member);
                _context.SaveChanges();
            }
            return Ok();
        }

        [HttpPost("[action]")]
        public IActionResult EditGroup([FromBody] GroupViewModel data)
        {
            var group = _context.Groups.Find(data.groupId);
            group.Name = data.name;
            group.GroupName = data.groupName;
            _context.Update(group);
            _context.SaveChanges();
            CreateNewGroupMembers(data.groupId, data.members);

            return Ok();
        }
    }
}