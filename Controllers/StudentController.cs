using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using test1.DAL;
using test1.Models;

namespace test1.Controllers
{
    public class StudentController : Controller
    {
        private readonly MyAppDbContext _appDbContext;

        public StudentController(MyAppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }

        public IActionResult Index()
        {
            return View();
        }
        [HttpGet]
        public JsonResult GetStudents()
        {
            var students = _appDbContext.Students.ToList();
            return Json(students);
        }

        [HttpPost]
        public JsonResult Insert(Student students)
        {
            if(ModelState.IsValid)
            {
                _appDbContext.Students.Add(students);
                _appDbContext.SaveChanges();
                return Json("Students Details saved succesfully");
            }
            return Json ("Model validation failed");
        }


        [HttpGet]
        public JsonResult Edit(int id)
        {
            var students = _appDbContext.Students.Find(id);
            return Json(students);
        }

        [HttpPost]
        public JsonResult Update(Student students)
        {
            if(ModelState.IsValid)
            {
                _appDbContext.Students.Update(students);
                _appDbContext.SaveChanges();
                return Json("Student details updated successfully");
            }
            return Json("model validation failed");
        }

        [HttpPost]
        public JsonResult Delete(int id)
        {
            var student = _appDbContext.Students.Find(id);
            if (student!=null)
            {
                _appDbContext.Students.Remove(student);
                _appDbContext.SaveChanges();
                return Json("Student details deleted successfully");
            }
            return Json($"student is not found with the id {id}");



        }
    }
}
