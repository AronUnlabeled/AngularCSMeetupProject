using AngularGroupProject.Data;
using AngularGroupProject.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace AngularGroupProject.Controllers
{   [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class FavsController : ControllerBase
    {
        public ApplicationDbContext FavsContext;
        public FavsController(ApplicationDbContext _context)
        {
            FavsContext = _context;
        }

        [HttpGet("allFavs")]
        public List<Event> allFavs()
        {
            List<Event> favEvents = new List<Event>();
            List<Fav> allFavs = new List<Fav>();
            ClaimsPrincipal currentUser = this.User;
            string currentUserID = currentUser.FindFirst(ClaimTypes.NameIdentifier).Value;
            allFavs = FavsContext.Favs.Where(F => F.UserId == currentUserID).ToList();
            
            
            foreach (Fav f in allFavs)
            {
                Event favEvent=FavsContext.Events.Find(f.EventId);
                favEvents.Add(favEvent);
            }
            return favEvents;

            //return FavsContext.Events.Where(E => allFavs.Any(F => F.EventId == E.Id)).ToList();
            
        }

        [HttpPost("addFavs")]
        public Fav addFav(int eventId)
        {
            ClaimsPrincipal currentUser = this.User;
            string currentUserID = currentUser.FindFirst(ClaimTypes.NameIdentifier).Value;
            bool exist = false;

            Fav newFav = new Fav()
            {
                EventId = eventId,
                UserId = currentUserID

            };


            FavsContext.Favs.Add(newFav);
            FavsContext.SaveChanges();


            //foreach (Fav f in FavsContext.Favs) {
            //    if (f.EventId == eventId)
            //    {
            //        exist = true;
            //    }   
            //}

            //if (!exist) {
            //    FavsContext.Favs.Add(newFav);
            //    FavsContext.SaveChanges();
            //}

            //if (!FavsContext.Favs.Any(f => f.EventId== eventId))
            //{
            //    FavsContext.Add(newFav);
            //    FavsContext.SaveChanges();
            //}
            return newFav;
        }

        [HttpDelete("deleteFavs")]
        public Fav deleteFav(int id)
        {
            Fav deletedFav = FavsContext.Favs.Find(id);
            FavsContext.Favs.Remove(deletedFav);
            FavsContext.SaveChanges();
            return deletedFav;
        }

    }
}

