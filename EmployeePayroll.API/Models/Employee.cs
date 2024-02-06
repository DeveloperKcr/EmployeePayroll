using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EmployeePayroll.API.Models
{
    [Table("Employee")]
    public class Employee
    {
        [Key]
        public int EmpId { get; set; }
        public string? EmpName { get; set; }
        public string? EmpContactNo { get; set; }
        public string? EmpAltContactNo { get; set; }
        public string? EmpEmail { get; set; }
        public string? AddressLine1 { get; set; }
        public string? AddressLine2 { get; set; }
        public string? City { get; set; }
        public string? State { get; set; }
        public string? PinCode { get; set; }
        public string? Designation { get; set; }
        public string? BankName { get; set; }
        public string? IFSC { get; set; }
        public string? AccountNo { get; set; }
        public string? BankBranch { get; set; }
        [Precision(18, 2)]
        public decimal Salary { get; set; } = 0;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
