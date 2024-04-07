using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;
using test1.DAL;
using test1.Models;

namespace test1.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        private readonly MyAppDbContext _appDbContext;

        public HomeController(MyAppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }

        public IActionResult Index()
        {
            return View();
        }

        public ActionResult SetMaintenance()
        {
            var SystemSettings = _appDbContext.SystemSettings.Where(w => w.ParamName == "OBDStatus" || w.ParamName == "TEXTMStatus").ToList();
            var CreditCardSettings = _appDbContext.CreditCardSettings.Where(w => w.CardName == "Visa" || w.CardName == "bKashCheckOut").ToList();
            ViewBag.SystemSettings = SystemSettings;
            ViewBag.CreditCardSettings = CreditCardSettings;
            return View();
        }
        public ActionResult SetOBDMaintenance(string isMaintenance)
        {
            var model = _appDbContext.SystemSettings.Where(w => w.ParamName == "OBDStatus").SingleOrDefault();
            if(model!=null)
            {
                model.ParamValue= isMaintenance;
                _appDbContext.SystemSettings.Update(model);
                _appDbContext.SaveChanges();
            }
            
            return RedirectToAction("SetMaintenance");
        }
        public ActionResult SetTextSmsMaintenance(string isMaintenance)
        {
            var model = _appDbContext.SystemSettings.Where(w => w.ParamName == "TEXTMStatus").SingleOrDefault();
            if (model != null)
            {
                model.ParamValue = isMaintenance;
                _appDbContext.SystemSettings.Update(model);
                _appDbContext.SaveChanges();
            }

            return RedirectToAction("SetMaintenance");
        }



    }
}
