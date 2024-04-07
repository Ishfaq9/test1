using Microsoft.EntityFrameworkCore;
using test1.Models;

namespace test1.DAL
{
    public class MyAppDbContext : DbContext
    {
        public MyAppDbContext(DbContextOptions options) : base(options)
        {
        }
        public virtual DbSet<Student> Students { get; set; }
        public virtual DbSet<Department> Departments { get; set; }
        public virtual DbSet<SystemSetting> SystemSettings { get; set; }
        public virtual DbSet<CreditCardSetting> CreditCardSettings { get; set;}


    }
}
