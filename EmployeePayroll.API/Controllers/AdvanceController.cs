using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using EmployeePayroll.API.Models;
using EmployeePayroll.API.Models.DTO;
using Microsoft.AspNetCore.Cors;

namespace EmployeePayroll.API.Controllers
{
    [Route("api/[controller]")]
    //[EnableCors("AllowOrigin")]
    [ApiController]
    public class AdvanceController : ControllerBase
    {
        private readonly EmployeePayrollDbContext _context;

        public AdvanceController(EmployeePayrollDbContext context)
        {
            _context = context;
        }

        // GET: api/Advance
        [HttpGet]
        public async Task<ActionResult<Result<IEnumerable<AdvanceDto>>>> GetAdvances()
        {
            if (_context.Advances == null)
            {
                return NotFound();
            }
            var advances = await _context.Advances
                .Join(_context.Employees, a => a.EmployeeId, em => em.EmpId,
                (a, em) => new AdvanceDto
                {
                    EmployeeId = a.EmployeeId,
                    EmpName = em.EmpName,
                    EmpContactNo = em.EmpContactNo,
                    AdvanceDate = a.AdvanceDate,
                    AdvanceId = a.AdvanceId,
                    Reason = a.Reason,
                    AdvanceAmount = a.AdvanceAmount
                }).ToListAsync();
            return await Result<IEnumerable<AdvanceDto>>.SuccessAsync(advances, "Success");
        }

        // GET: api/Advance/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Result<Advance>>> GetAdvance(int id)
        {
            if (_context.Advances == null)
            {
                return NotFound();
            }
            var advance = await _context.Advances.FindAsync(id);

            if (advance == null)
            {
                return NotFound();
            }

            return await Result<Advance>.SuccessAsync(advance, "Success");
        }

        // PUT: api/Advance/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAdvance(int id, Advance advance)
        {
            if (id != advance.AdvanceId)
            {
                return BadRequest();
            }

            _context.Entry(advance).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AdvanceExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok(Result<Advance>.Success(advance, "Successfully Updated"));
        }

        // POST: api/Advance
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Advance>> PostAdvance(Advance advance)
        {
            if (_context.Advances == null)
            {
                return Problem("Entity set 'EmployeePayrollDbContext.Advances'  is null.");
            }
            _context.Advances.Add(advance);
            await _context.SaveChangesAsync();
            //return CreatedAtAction("GetAdvance", new { id = advance.AdvanceId }, advance);
            return Ok(Result<Advance>.Success(advance, "Successfully Added"));
        }

        // DELETE: api/Advance/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAdvance(int id)
        {
            if (_context.Advances == null)
            {
                return NotFound();
            }
            var advance = await _context.Advances.FindAsync(id);
            if (advance == null)
            {
                return NotFound();
            }

            _context.Advances.Remove(advance);
            await _context.SaveChangesAsync();

            return Ok(Result<Advance>.Success(advance, "Successfully Deleted"));
        }

        private bool AdvanceExists(int id)
        {
            return (_context.Advances?.Any(e => e.AdvanceId == id)).GetValueOrDefault();
        }

        // GET: api/Advance/5
        [HttpGet("{action}/{empId}")]
        public async Task<ActionResult<Result<IEnumerable<Advance>>>> GetAllAdvanceByEmpId(int empId)
        {
            if (_context.Advances == null)
            {
                return NotFound();
            }
            var advances = await _context.Advances.Where(p => p.EmployeeId == empId).ToListAsync();

            if (advances == null)
            {
                return NotFound();
            }

            return await Result<IEnumerable<Advance>>.SuccessAsync(advances, "Success");
        }
    }
}
