import { Component, OnInit } from '@angular/core';
import { IAttendance, attendance } from 'src/app/classes/attendance';
import { employee } from 'src/app/classes/employee';
import { AttendanceService } from 'src/app/services/attendance.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { DatePipe } from '@angular/common'

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.css']
})
export class AttendanceComponent implements OnInit {
  attendanceArray: IAttendance[] = [];
  attendanceObj: attendance = new attendance();
  employeeArr: employee [] = [];
  constructor(private empSrv: EmployeeService, private attendanceSrv: AttendanceService, private datePipe: DatePipe) {

  }
  ngOnInit(): void {
    this.loadAllAttendance();
    this.getEmployees();
  }
  loadAllAttendance() {
    this.attendanceSrv.getAllAttendance().subscribe((res: any) => {
      this.attendanceArray = res.data;
    });
  }
  getEmployees() {
    this.empSrv.getAllEmployees().subscribe((res: any) => {
      this.employeeArr = res.data;
    });
  }
  onEdit(id: number) {
    this.attendanceSrv.getAllAttendanceById(id).subscribe((res: any) => {
      res.data.attendanceDate = this.datePipe.transform(res.data.attendanceDate,'yyyy-MM-dd');
      res.data.inTime = this.datePipe.transform(res.data.inTime,'HH:mm');
      res.data.outTime = this.datePipe.transform(res.data.outTime,'HH:mm');
      this.attendanceObj = res.data;
    });
  }

  onDelete(id: number) {
    this.attendanceSrv.deleteAttendanceById(id).subscribe((res: any) => {
      if (res.succeeded) {
        this.loadAllAttendance();
      }
      alert(res.messages[0]);
    });
  }
  onSave() {
    this.attendanceObj.inTime = this.attendanceObj.inTime != null && this.attendanceObj.attendanceDate != null 
                                  ? new Date(this.attendanceObj.attendanceDate + ' ' +this.attendanceObj.inTime)
                                  : undefined;
    this.attendanceObj.outTime = this.attendanceObj.outTime != null && this.attendanceObj.attendanceDate != null 
                                  ? new Date(this.attendanceObj.attendanceDate + ' ' +this.attendanceObj.outTime) 
                                  : undefined;
    //console.log(this.attendanceObj.inTime);
    //console.log(this.attendanceObj.outTime);
    // const date = moment(this.attendanceObj.attendanceDate + ' ' +this.attendanceObj.inTime, 'MM-DD-YYYY hh:mm:ss').toDate();
    // console.log(this.datePipe.transform(this.attendanceObj.inTime, 'yyyy-MM-dd HH:mm:ss'));
    // console.log(this.datePipe.transform(this.attendanceObj.outTime, 'yyyy-MM-dd HH:mm:ss'));
    this.attendanceSrv.createAttendance(this.attendanceObj).subscribe((res: any) => {
      if (res.succeeded) {
        this.loadAllAttendance();
        this.attendanceObj = new attendance();
      } 
      alert(res.messages[0]);
    });
  }

  onUpdate() {
    this.attendanceObj.inTime = this.attendanceObj.inTime != null && this.attendanceObj.attendanceDate != null 
                                  ? new Date(this.attendanceObj.attendanceDate + ' ' +this.attendanceObj.inTime)
                                  : undefined;
    this.attendanceObj.outTime = this.attendanceObj.outTime != null && this.attendanceObj.attendanceDate != null 
                                  ? new Date(this.attendanceObj.attendanceDate + ' ' +this.attendanceObj.outTime) 
                                  : undefined;
    //console.log(this.attendanceObj.inTime);
    //console.log(this.attendanceObj.outTime);
    // const date = moment(this.attendanceObj.attendanceDate + ' ' +this.attendanceObj.inTime, 'MM-DD-YYYY hh:mm:ss').toDate();
    // console.log(this.datePipe.transform(this.attendanceObj.inTime, 'yyyy-MM-dd HH:mm:ss'));
    // console.log(this.datePipe.transform(this.attendanceObj.outTime, 'yyyy-MM-dd HH:mm:ss'));    
    this.attendanceSrv.updateAttendance(this.attendanceObj.attendanceId,  this.attendanceObj).subscribe((res: any) => {
      if (res.succeeded) {
        this.loadAllAttendance();
        this.attendanceObj = new attendance();
      }
      alert(res.messages[0]);
    });
  }
  resetObj() {
    this.attendanceObj = new attendance();
  }
}
