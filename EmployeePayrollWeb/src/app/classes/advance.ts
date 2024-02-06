export interface IAdvance{
    empName: string;
    empContactNo: string;
    employeeId: number;
    advanceId: number;
    advanceDate: string;
    advanceAmount: number;
    reason: string;
}
export class advance {
    advanceId: number = 0;
    employeeId: number = 0;
    advanceDate?: Date = undefined;
    advanceAmount: number = 0;
    reason: string = "";
  }