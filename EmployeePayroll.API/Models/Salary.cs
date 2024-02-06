using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EmployeePayroll.API.Models
{
    [Table("Salary")]
    public class Salary
    {
        [Key]
        public int SalaryId { get; set; }
        public int? EmployeeId { get; set; }
        public DateTime? SalaryDate { get; set; }
        [Precision(18, 2)]
        public decimal TotalAdvance { get; set; } = 0;
        public int? PresentDays { get; set; }
        [Precision(18, 2)]
        public decimal SalaryAmount { get; set; } = 0;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
