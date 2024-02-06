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
    [ApiController]
    public class LeaveController : ControllerBase
    {
        private readonly EmployeePayrollDbContext _context;

        public LeaveController(EmployeePayrollDbContext context)
        {
            _context = context;
        }

        // GET: api/Leave
        [HttpGet]
        public async Task<ActionResult<Result<IEnumerable<LeaveDto>>>> GetLeaves()
        {
            if (_context.Leaves == null)
            {
                return NotFound();
            }
            var leaves = await _context.Leaves
                .Join(_context.Employees, a => a.EmployeeId, em => em.EmpId,
                (a, em) => new LeaveDto
                {
                    EmployeeId = a.EmployeeId,
                    EmpName = em.EmpName,
                    EmpContactNo = em.EmpContactNo,
                    LeaveDate = a.LeaveDate,
                    LeaveId = a.LeaveId,
                    LeaveReason = a.LeaveReason,
                    NoOfFullDayLeaves = a.NoOfFullDayLeaves,
                    NoOfHalfDayLeaves = a.NoOfHalfDayLeaves
                }).ToListAsync();
            return await Result<IEnumerable<LeaveDto>>.SuccessAsync(leaves, "Success");
        }

        // GET: api/Leave/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Result<Leave>>> GetLeave(int id)
        {
            if (_context.Leaves == null)
            {
                return NotFound();
            }
            var leave = await _context.Leaves.FindAsync(id);

            if (leave == null)
            {
                return NotFound();
            }

            return await Result<Leave>.SuccessAsync(leave, "Success");
        }

        // PUT: api/Leave/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutLeave(int id, Leave leave)
        {
            if (id != leave.LeaveId)
            {
                return BadRequest();
            }

            _context.Entry(leave).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!LeaveExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok(Result<Leave>.Success(leave, "Successfully Updated"));
        }

        // POST: api/Leave
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Leave>> PostLeave(Leave leave)
        {
            if (_context.Leaves == null)
            {
                return Problem("Entity set 'EmployeePayrollDbContext.Leaves'  is null.");
            }
            _context.Leaves.Add(leave);
            await _context.SaveChangesAsync();

            //return CreatedAtAction("GetLeave", new { id = leave.LeaveId }, leave);
            return Ok(Result<Leave>.Success(leave, "Successfully Added"));
        }

        // DELETE: api/Leave/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteLeave(int id)
        {
            if (_context.Leaves == null)
            {
                return NotFound();
            }
            var leave = await _context.Leaves.FindAsync(id);
            if (leave == null)
            {
                return NotFound();
            }

            _context.Leaves.Remove(leave);
            await _context.SaveChangesAsync();

            return Ok(Result<Leave>.Success(leave, "Successfully Deleted"));
        }

        private bool LeaveExists(int id)
        {
            return (_context.Leaves?.Any(e => e.LeaveId == id)).GetValueOrDefault();
        }

        // GET: api/Advance/5
        [HttpGet("{action}/{empId}")]
        public async Task<ActionResult<Result<IEnumerable<Leave>>>> GetAllLeavesByEmpId(int empId)
        {
            if (_context.Advances == null)
            {
                return NotFound();
            }
            var leaves = await _context.Leaves.Where(p => p.EmployeeId == empId).ToListAsync();

            if (leaves == null)
            {
                return NotFound();
            }

            return await Result<IEnumerable<Leave>>.SuccessAsync(leaves, "Success");
        }
    }
}
