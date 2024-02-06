using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EmployeePayroll.API.Models
{
    [Table("Leave")]
    public class Leave
    {
        [Key]
        public int LeaveId { get; set; }
        public int? EmployeeId { get; set; }
        public DateTime? LeaveDate { get; set; }
        public string? LeaveReason { get; set; }
        public int? NoOfFullDayLeaves { get; set; }
        public int? NoOfHalfDayLeaves { get; set; }
    }
}
