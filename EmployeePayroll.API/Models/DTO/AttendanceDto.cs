namespace EmployeePayroll.API.Models.DTO
{
    public class AttendanceDto
    {
        public int AttendanceId { get; set; }
        public int? EmployeeId { get; set; }
        public DateTime? AttendanceDate { get; set; }
        public DateTime? InTime { get; set; }
        public DateTime? OutTime { get; set; }
        public bool IsFullDay { get; set; } = false;
        public string? EmpName { get; set; }
        public string? EmpContactNo { get; set; }
    }
}
