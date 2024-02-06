export interface ISalary {
    empName: string
    empContactNo: string
    employeeId: number
    salaryDate: string
    salaryId: number
    totalAdvance: number
    presentDays: number
    salaryAmount: number
}
export class salary {
    salaryId: number = 0;
    employeeId: number = 0;
    salaryDate?: Date = undefined;
    totalAdvance: number = 0;
    presentDays: number = 0;
    salaryAmount: number = 0;
  }