export interface ILeave {
    empName: string
    empContactNo: string
    employeeId: number
    leaveDate: string
    leaveId: number
    leaveReason: string
    noOfFullDayLeaves: number
    noOfHalfDayLeaves: number
}
export class leave {
    leaveId: number = 0;
    employeeId: number = 0;
    leaveDate?: Date = undefined;
    leaveReason: string = "";
    noOfFullDayLeaves?: number = 0;
    noOfHalfDayLeaves?: number = 0;
  }