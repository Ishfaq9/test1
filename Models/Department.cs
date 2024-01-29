using System.ComponentModel.DataAnnotations;

namespace test1.Models
{
    public class Department
    {
        [Key]
        public int dId { get; set; }
        public string ddepartment { get; set; }
        [Required]
        public string teacher { get; set; }
    }
}
