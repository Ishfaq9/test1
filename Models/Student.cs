using System.ComponentModel.DataAnnotations;

namespace test1.Models
{
    public class Student
    {
        [Key]
        public int sid { get; set; }
        [Required]
        public string name { get; set; }
        [Required]
        public int age { get; set; }
        [Required]

        public string email { get; set; }
        [Required]
        public string sdepartment { get; set; }
        [Required]
        public string status { get; set; }
    }
}
