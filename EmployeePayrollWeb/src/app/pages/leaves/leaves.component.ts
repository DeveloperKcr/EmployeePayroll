import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { employee } from 'src/app/classes/employee';
import { ILeave, leave } from 'src/app/classes/leave';
import { EmployeeService } from 'src/app/services/employee.service';
import { LeaveService } from 'src/app/services/leave.service';

@Component({
  selector: 'app-leaves',
  templateUrl: './leaves.component.html',
  styleUrls: ['./leaves.component.css']
})
export class LeavesComponent implements OnInit {
  leaveArray: ILeave[] = [];
  leaveObj: leave = new leave();
  employeeArr: employee [] = [];
  constructor(private empSrv:EmployeeService, private leaveSrv: LeaveService, private datePipe: DatePipe){

  }
  ngOnInit(): void {
    this.loadAllLeave();
    this.getEmployees();
  }

  loadAllLeave() {
    this.leaveSrv.getAllLeave().subscribe((res: any) => {
      this.leaveArray = res.data;
    });
  }
  getEmployees() {
    this.empSrv.getAllEmployees().subscribe((res: any) => {
      this.employeeArr = res.data;
    });
  }
  onEdit(id: number) {
    this.leaveSrv.getAllLeaveById(id).subscribe((res: any) => {
      res.data.leaveDate = this.datePipe.transform(res.data.leaveDate,'yyyy-MM-dd');
      this.leaveObj = res.data;
    });
  }

  onDelete(id: number) {
    this.leaveSrv.deleteLeaveById(id).subscribe((res: any) => {
      if (res.succeeded) {
        this.loadAllLeave();
      }
      alert(res.messages[0]);
    });
  }
  onSave() {
    this.leaveSrv.createLeave(this.leaveObj).subscribe((res: any) => {
      if (res.succeeded) {
        this.loadAllLeave();
        this.leaveObj = new leave();
      } 
      alert(res.messages[0]);
    });
  }

  onUpdate() {
    this.leaveSrv.updateLeave(this.leaveObj.leaveId,this.leaveObj).subscribe((res: any) => {
      if (res.succeeded) {
        this.loadAllLeave();
        this.leaveObj = new leave();
      }
      alert(res.messages[0]);
    });
  }
  resetObj() {
    this.leaveObj = new leave();
  }

}
