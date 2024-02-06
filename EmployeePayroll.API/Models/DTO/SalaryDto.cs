using Microsoft.EntityFrameworkCore;

namespace EmployeePayroll.API.Models.DTO
{
    public class SalaryDto
    {
        public int SalaryId { get; set; }
        public int? EmployeeId { get; set; }
        public DateTime? SalaryDate { get; set; }
        public decimal TotalAdvance { get; set; } = 0;
        public int? PresentDays { get; set; }
        public decimal SalaryAmount { get; set; } = 0;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public string? EmpName { get; set; }
        public string? EmpContactNo { get; set; }
    }
}
