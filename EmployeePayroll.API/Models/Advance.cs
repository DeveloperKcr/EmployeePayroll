using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EmployeePayroll.API.Models
{
    [Table("Advance")]
    public class Advance
    {
        [Key]
        public int AdvanceId { get; set; }
        public int? EmployeeId { get; set; }
        public DateTime? AdvanceDate { get; set; }
        [Precision(18, 2)]
        public decimal AdvanceAmount { get; set; } = 0;
        public string? Reason { get; set; }
    }
}
