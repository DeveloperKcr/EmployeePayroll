using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using EmployeePayroll.API.Models;
using Microsoft.AspNetCore.Cors;
using EmployeePayroll.API.Models.DTO;

namespace EmployeePayroll.API.Controllers
{
    [Route("api/[controller]")]
    //[EnableCors("AllowOrigin")]
    [ApiController]
    public class AttendanceController : ControllerBase
    {
        private readonly EmployeePayrollDbContext _context;

        public AttendanceController(EmployeePayrollDbContext context)
        {
            _context = context;
        }

        // GET: api/Attendance
        [HttpGet]
        public async Task<ActionResult<Result<IEnumerable<AttendanceDto>>>> GetAttendances()
        {
            if (_context.Attendances == null)
            {
                return NotFound();
            }
            var attendances = await _context.Attendances
                .Join(_context.Employees, a => a.EmployeeId, em => em.EmpId, 
                (a, em) => new AttendanceDto
                {
                    EmployeeId = a.EmployeeId,
                    EmpName = em.EmpName,
                    EmpContactNo = em.EmpContactNo,
                    AttendanceDate = a.AttendanceDate,
                    AttendanceId = a.AttendanceId,
                    InTime = a.InTime,
                    OutTime = a.OutTime,
                    IsFullDay = a.IsFullDay
                }).ToListAsync();
            return await Result<IEnumerable<AttendanceDto>>.SuccessAsync(attendances, "Success");
        }

        // GET: api/Attendance/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Result<Attendance>>> GetAttendance(int id)
        {
            if (_context.Attendances == null)
            {
                return NotFound();
            }
            var attendance = await _context.Attendances.FindAsync(id);

            if (attendance == null)
            {
                return NotFound();
            }
            return await Result<Attendance>.SuccessAsync(attendance, "Success");
        }

        // PUT: api/Attendance/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAttendance(int id, Attendance attendance)
        {
            if (id != attendance.AttendanceId)
            {
                return BadRequest();
            }

            _context.Entry(attendance).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AttendanceExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok(Result<Attendance>.Success(attendance, "Successfully Updated"));
        }

        // POST: api/Attendance
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Attendance>> PostAttendance(Attendance attendance)
        {
            if (_context.Attendances == null)
            {
                return Problem("Entity set 'EmployeePayrollDbContext.Attendances'  is null.");
            }

            //Attendance attend = new Attendance()
            //{
            //    EmployeeId = attendance.EmployeeId,
            //    AttendanceDate = attendance.AttendanceDate,
            //    InTime = !string.IsNullOrEmpty(attendance.InTime) && attendance.AttendanceDate != null 
            //                        ? attendance.AttendanceDate.Value
            //                            .AddHours(Convert.ToDouble(attendance.InTime.Split(':')[0]))
            //                            .AddMinutes(Convert.ToDouble(attendance.InTime.Split(':')[1])) 
            //                        : null,
            //    OutTime = !string.IsNullOrEmpty(attendance.OutTime) && attendance.AttendanceDate != null
            //                        ? attendance.AttendanceDate.Value
            //                            .AddHours(Convert.ToDouble(attendance.OutTime.Split(':')[0]))
            //                            .AddMinutes(Convert.ToDouble(attendance.OutTime.Split(':')[1]))
            //                        : null,
            //    IsFullDay = attendance.IsFullDay
            //};
            _context.Attendances.Add(attendance);
            await _context.SaveChangesAsync();

            //return CreatedAtAction("GetAttendance", new { id = attendance.AttendanceId }, attendance);
            return Ok(Result<Attendance>.Success(attendance, "Successfully Added"));
        }

        // DELETE: api/Attendance/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAttendance(int id)
        {
            if (_context.Attendances == null)
            {
                return NotFound();
            }
            var attendance = await _context.Attendances.FindAsync(id);
            if (attendance == null)
            {
                return NotFound();
            }

            _context.Attendances.Remove(attendance);
            await _context.SaveChangesAsync();

            return Ok(Result<Attendance>.Success(attendance, "Successfully Deleted"));
        }

        private bool AttendanceExists(int id)
        {
            return (_context.Attendances?.Any(e => e.AttendanceId == id)).GetValueOrDefault();
        }
    }
}
