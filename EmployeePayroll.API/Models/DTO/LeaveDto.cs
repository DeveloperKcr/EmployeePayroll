namespace EmployeePayroll.API.Models.DTO
{
    public class LeaveDto
    {
        public int LeaveId { get; set; }
        public int? EmployeeId { get; set; }
        public DateTime? LeaveDate { get; set; }
        public string? LeaveReason { get; set; }
        public int? NoOfFullDayLeaves { get; set; }
        public int? NoOfHalfDayLeaves { get; set; }
        public string? EmpName { get; set; }
        public string? EmpContactNo { get; set; }
    }
}
