import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IAdvance, advance } from 'src/app/classes/advance';
import { employee } from 'src/app/classes/employee';
import { AdvanceService } from 'src/app/services/advance.service';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-advance',
  templateUrl: './advance.component.html',
  styleUrls: ['./advance.component.css']
})
export class AdvanceComponent implements OnInit {
  advanceArray: IAdvance[] = [];
  advanceObj: advance = new advance();
  employeeArr: employee [] = [];
  constructor(private empSrv:EmployeeService, private advanceSrv: AdvanceService, private datePipe: DatePipe){

  }
  ngOnInit(): void {
    this.loadAllAdvance();
    this.getEmployees();
  }

  loadAllAdvance() {
    this.advanceSrv.getAllAdvance().subscribe((res: any) => {
      this.advanceArray = res.data;
    });
  }
  getEmployees() {
    this.empSrv.getAllEmployees().subscribe((res: any) => {
      this.employeeArr = res.data;
    });
  }
  onEdit(id: number) {    
    this.advanceSrv.getAllAdvanceById(id).subscribe((res: any) => {
      res.data.advanceDate = this.datePipe.transform(res.data.advanceDate,'yyyy-MM-dd');
      this.advanceObj = res.data;
    });
  }

  onDelete(id: number) {
    this.advanceSrv.deleteAdvanceById(id).subscribe((res: any) => {
      if (res.succeeded) {
        this.loadAllAdvance();
      }
      alert(res.messages[0]);
    });
  }
  onSave() {
    this.advanceSrv.createAdvance(this.advanceObj).subscribe((res: any) => {
      if (res.succeeded) {
        this.loadAllAdvance();
        this.advanceObj = new advance();
      } 
      alert(res.messages[0]);
    });
  }

  onUpdate() {
    this.advanceSrv.updateAdvance(this.advanceObj.advanceId,this.advanceObj).subscribe((res: any) => {
      if (res.succeeded) {
        this.loadAllAdvance();
        this.advanceObj = new advance();
      }
      alert(res.messages[0]);
    });
  }
  resetObj() {
    this.advanceObj = new advance();
  }
}
