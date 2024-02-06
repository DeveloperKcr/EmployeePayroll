export interface IAttendance {
    empName: string;
    empContactNo: string;
    employeeId: number;
    attendanceDate: string;
    attendanceId: number;
    inTime: string;
    outTime: string;
    isFullDay: boolean;
}

export class attendance {
    attendanceId: number;
    employeeId: number;
    attendanceDate?: Date;
    inTime?: Date;
    outTime?: Date;
    isFullDay: boolean;
    constructor(){
        this.attendanceId = 0;
        this.employeeId = 0;
        this.attendanceDate = undefined;
        this.inTime = undefined;
        this.outTime = undefined;
        this.isFullDay = false;
    }
  }