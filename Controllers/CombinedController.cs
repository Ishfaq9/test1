using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using test1.DAL;
using test1.Models;

namespace test1.Controllers
{
    public class CombinedController : Controller
    {
        private readonly MyAppDbContext _context;

        public CombinedController(MyAppDbContext context)
        {
            _context = context;
        }

        public IActionResult Index()
        {
            return View();
        }

        [HttpGet]
        public JsonResult GetAllDetails()
        {
            try
            {
                List<CombinedViewModel>? model = null;
                var name = "Computer Science";
                var paramId = new SqlParameter("@name", name);
                model = _context.Database.SqlQueryRaw< test1.Models.CombinedViewModel>("exec studentinfo").ToList();
                return Json(model);
            }
            catch (Exception ex)
            {
                // Log the exception or handle it appropriately
                return Json(new { error = "An error occurred while fetching data." });
            }
        }

        [HttpGet]
        public JsonResult Edit(int sid,int dId) {

            var student = _context.Students.Find(sid);
            var department = _context.Departments.Find(dId);
            var result = new
            {
                Student = student,
                Department = department
            };

            return Json(result);
        }
        [HttpPost]
        public JsonResult Update(CombinedViewModel students)
        {
            var student = _context.Students.Find(students.sid);
            var department = _context.Departments.Find(students.dId);
            if(student==null || department==null)
            {
                return Json("Student or department not found" );
            }
            else
            {
                student.name=students.name;
                student.age=students.age;
                student.email=students.email;
                student.status=students.status;
                student.sdepartment= students.sdepartment;
                department.teacher = students.teacher;
                _context.SaveChanges();
                return Json( "Student and department updated successfully");
                }
        }

        [HttpPost]
        public JsonResult Delete(int sid, int dId)
        {
            var student = _context.Students.Find(sid);
            var department = _context.Departments.Find(dId);

            if (student != null || department!=null)
            {
                
                _context.Students.Remove(student);
                _context.SaveChanges();
                return Json("Student details deleted successfully");
            }
            return Json($"student is not found with the id {sid}");
        }

    }
}
