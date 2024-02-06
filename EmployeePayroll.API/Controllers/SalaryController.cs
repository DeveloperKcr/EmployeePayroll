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
    public class SalaryController : ControllerBase
    {
        private readonly EmployeePayrollDbContext _context;

        public SalaryController(EmployeePayrollDbContext context)
        {
            _context = context;
        }

        // GET: api/Salary
        [HttpGet]
        public async Task<ActionResult<Result<IEnumerable<SalaryDto>>>> GetSalaries()
        {
            if (_context.Salaries == null)
            {
                return NotFound();
            }
            var salaries = await _context.Salaries
                .Join(_context.Employees, a => a.EmployeeId, em => em.EmpId,
                (a, em) => new SalaryDto
                {
                    EmployeeId = a.EmployeeId,
                    EmpName = em.EmpName,
                    EmpContactNo = em.EmpContactNo,
                    SalaryDate = a.SalaryDate,
                    SalaryId = a.SalaryId,
                    TotalAdvance = a.TotalAdvance,
                    PresentDays = a.PresentDays,
                    SalaryAmount = a.SalaryAmount
                }).ToListAsync();
            return await Result<IEnumerable<SalaryDto>>.SuccessAsync(salaries, "Success");
        }

        // GET: api/Salary/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Result<Salary>>> GetSalary(int id)
        {
            if (_context.Salaries == null)
            {
                return NotFound();
            }
            var salary = await _context.Salaries.FindAsync(id);

            if (salary == null)
            {
                return NotFound();
            }

            return await Result<Salary>.SuccessAsync(salary, "Success");
        }

        // PUT: api/Salary/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutSalary(int id, Salary salary)
        {
            if (id != salary.SalaryId)
            {
                return BadRequest();
            }

            _context.Entry(salary).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SalaryExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok(Result<Salary>.Success(salary, "Successfully Updated"));
        }

        // POST: api/Salary
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Salary>> PostSalary(Salary salary)
        {
            if (_context.Salaries == null)
            {
                return Problem("Entity set 'EmployeePayrollDbContext.Salaries'  is null.");
            }
            _context.Salaries.Add(salary);
            await _context.SaveChangesAsync();

            //return CreatedAtAction("GetSalary", new { id = salary.SalaryId }, salary);
            return Ok(Result<Salary>.Success(salary, "Successfully Added"));
        }

        // DELETE: api/Salary/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSalary(int id)
        {
            if (_context.Salaries == null)
            {
                return NotFound();
            }
            var salary = await _context.Salaries.FindAsync(id);
            if (salary == null)
            {
                return NotFound();
            }

            _context.Salaries.Remove(salary);
            await _context.SaveChangesAsync();

            return Ok(Result<Salary>.Success(salary, "Successfully Deleted"));
        }

        private bool SalaryExists(int id)
        {
            return (_context.Salaries?.Any(e => e.SalaryId == id)).GetValueOrDefault();
        }
    }
}
