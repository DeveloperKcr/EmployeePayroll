using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using System.ComponentModel.DataAnnotations.Schema;

namespace EmployeePayroll.API.Models
{
    public class EmployeePayrollDbContext : DbContext
    {
        public EmployeePayrollDbContext(DbContextOptions<EmployeePayrollDbContext> options) : base(options) { }

        
        public DbSet<Employee> Employees { get; set; }
        public DbSet<Attendance> Attendances { get; set; }
        public DbSet<Leave> Leaves { get; set; }
        public DbSet<Advance> Advances { get; set; }
        public DbSet<Salary> Salaries { get; set; }
    }
}
