using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using CapstoneProject.ViewModels;
using Newtonsoft.Json;
using CapstoneProject.Models;
using Microsoft.AspNetCore.Routing;
using Microsoft.IdentityModel.Protocols;
using CapstoneProject.Data;


namespace CapstoneProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public UsersController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpPost("[action]")]
        public IActionResult Login([FromBody] LogInAttempt data)
        {
            if (data.email != null && data.password != null)
            {
                try
                {
                    var user = _context.Travellers.FirstOrDefault(a => a.Email == data.email);
                    if (user != null)
                    {
                        string passwordAttempt = data.password;
                        var actualPassword = user.Password;
                        if (actualPassword == passwordAttempt)
                        {
                            LoggedInTravellerViewModel viewModel = new LoggedInTravellerViewModel();
                            viewModel.first_name = user.FirstName;
                            viewModel.last_name = user.LastName;

                            return Ok(viewModel);
                        }
                        else
                        {
                            return Unauthorized();
                        }
                    }
                    else
                    {
                        return NotFound();
                    }
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

        // POST: api/Users
        [HttpPost("[action]")]

        public IActionResult Create([FromBody] TravellerViewModel data)
        {
            if (data != null)
            {
                try
                {
                    if (_context.Travellers.FirstOrDefault(e => data.email == e.Email) != null)
                    {
                        return Conflict();
                    }
                    else
                    {
                        Traveller traveller = new Traveller();
                        traveller.FirstName = data.first_name;
                        traveller.LastName = data.last_name;
                        traveller.Password = data.password;
                        traveller.Email = data.email;
                        _context.Travellers.Add(traveller);
                        _context.SaveChangesAsync();
                        LoggedInTravellerViewModel viewModel = new LoggedInTravellerViewModel();
                        viewModel.first_name = traveller.FirstName;
                        viewModel.last_name = traveller.LastName;
                        return Ok(viewModel);
                    }
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

        // PUT: api/Users/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}