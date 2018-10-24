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

        private LoggedInTravellerViewModel GetUserInfoFromTraveller(Traveller traveller)
        {
            LoggedInTravellerViewModel viewModel = new LoggedInTravellerViewModel();
            viewModel.first_name = traveller.FirstName;
            viewModel.last_name = traveller.LastName;
            viewModel.Id = traveller.Id;
            return viewModel;
        }

        private LoggedInTravellerViewModel GetUserInfoFromEmail(string email)
        {
            var traveller = _context.Travellers.FirstOrDefault(e => e.Email == email);
            return GetUserInfoFromTraveller(traveller);
        }

        // POST: api/Users
        [HttpPost("[action]")]

        public async Task<IActionResult> Create([FromBody] TravellerViewModel data)
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
                        traveller.FirstName = data.first_name.Trim();
                        traveller.LastName = data.last_name.Trim();
                        traveller.Password = data.password;
                        traveller.Email = data.email.Trim();
                        _context.Travellers.Add(traveller);
                        await _context.SaveChangesAsync();
                        LoggedInTravellerViewModel viewModel = GetUserInfoFromEmail(data.email);
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

        private IEnumerable<Traveller> SearchByName(string first_name = null, string last_name = null)
        {
            IEnumerable<Traveller> firstNameMatches;

            IEnumerable<Traveller> matches;


            if (first_name != null)
            {
                firstNameMatches = _context.Travellers.Where(a => a.FirstName.ToLower().Trim() == first_name.ToLower().Trim());
                if (last_name != null)
                {
                    matches = firstNameMatches.Where(a => a.LastName.ToLower().Trim() == last_name.ToLower().Trim());
                }
                else
                {
                    matches = firstNameMatches;
                }
            }
            else if (last_name != null)
            {
                matches = _context.Travellers.Where(a => a.LastName.ToLower().Trim() == last_name.ToLower().Trim());
            }
            else
            {
                return null;
            }
            return matches;
        }

        private List<SearchTravellerViewModel> GetSearchMatches(IEnumerable<Traveller> matches)
        {
            List<SearchTravellerViewModel> searchResults = new List<SearchTravellerViewModel> { };
            foreach (Traveller match in matches)
            {
                SearchTravellerViewModel searchResult = new SearchTravellerViewModel();
                searchResult.name = $"{match.FirstName} {match.LastName}";
                searchResult.Id = match.Id;
                searchResults.Add(searchResult);
            }
            return searchResults;
        }

        [HttpGet("[action]")]
        public IEnumerable<SearchTravellerViewModel> SearchUsersByName(string first_name = null, string last_name = null)
        {
            IEnumerable<Traveller> matches = SearchByName(first_name, last_name);
            return GetSearchMatches(matches);
        }

        [HttpGet("[action]")]
        public IEnumerable<SearchTravellerViewModel> UniversalUserSearch(string term1)
        {
            if (term1 == null)
            {
                return null;
            }
            string[] terms = term1.Split(' ');
            List<Traveller> matches = new List<Traveller> { };
            foreach (String item in terms)
            {
                var nameMatches = _context.Travellers.Where(a =>
                    $"{a.FirstName.ToLower()} {a.LastName.ToLower()}".Contains(item));
                matches.AddRange(nameMatches);
            }
            matches = matches.Distinct().ToList();

            return GetSearchMatches(matches);
        }
    }
}