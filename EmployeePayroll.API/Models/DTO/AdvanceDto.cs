using Microsoft.EntityFrameworkCore;

namespace EmployeePayroll.API.Models.DTO
{
    public class AdvanceDto
    {
        public int AdvanceId { get; set; }
        public int? EmployeeId { get; set; }
        public DateTime? AdvanceDate { get; set; }        
        public decimal AdvanceAmount { get; set; } = 0;
        public string? Reason { get; set; }
        public string? EmpName { get; set; }
        public string? EmpContactNo { get; set; }
    }
}
