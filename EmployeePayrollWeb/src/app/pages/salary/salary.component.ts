import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { employee } from 'src/app/classes/employee';
import { ISalary, salary } from 'src/app/classes/salary';
import { AdvanceService } from 'src/app/services/advance.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { LeaveService } from 'src/app/services/leave.service';
import { SalaryService } from 'src/app/services/salary.service';

@Component({
  selector: 'app-salary',
  templateUrl: './salary.component.html',
  styleUrls: ['./salary.component.css']
})
export class SalaryComponent implements OnInit {
  salaryArray: ISalary[] = [];
  salaryObj: salary = new salary();
  employeeArr: employee [] = [];
  totalAdvAmount:number=0;
  totalLeaves:number=0;
  constructor(private empSrv:EmployeeService, 
    private salarySrv: SalaryService, 
    private datePipe: DatePipe, 
    private advSrv: AdvanceService,
    private leaveSrv: LeaveService
    ){

  }
  ngOnInit(): void {
    this.loadAllSalary();
    this.getEmployees();
  }

  loadAllSalary() {
    this.salarySrv.getAllSalary().subscribe((res: any) => {
      this.salaryArray = res.data;
    });
  }
  getEmployees() {
    this.empSrv.getAllEmployees().subscribe((res: any) => {
      this.employeeArr = res.data;
    });
  }
  onEdit(id: number) {
    this.salarySrv.getAllSalaryById(id).subscribe((res: any) => {
      res.data.salaryDate = this.datePipe.transform(res.data.salaryDate,'yyyy-MM-dd');
      this.salaryObj = res.data;
    });
  }

  onDelete(id: number) {
    this.salarySrv.deleteSalaryById(id).subscribe((res: any) => {
      if (res.succeeded) {
        this.loadAllSalary();
      }
      alert(res.messages[0]);
    });
  }
  onSave() {
    this.salarySrv.createSalary(this.salaryObj).subscribe((res: any) => {
      if (res.succeeded) {
        this.loadAllSalary();
        this.salaryObj = new salary();
      } 
      alert(res.messages[0]);
    });
  }

  onUpdate() {
    this.salarySrv.updateSalary(this.salaryObj.salaryId,this.salaryObj).subscribe((res: any) => {
      if (res.succeeded) {
        this.loadAllSalary();
        this.salaryObj = new salary();
      }
      alert(res.messages[0]);
    });
  }
  resetObj() {
    this.salaryObj = new salary();
  }
  getEmpData(){
    this.getAllAdvance();
    this.getAllLeaves();
  }
  getAllAdvance(){
    debugger;
    this.advSrv.getAllAdvanceByEmpId(this.salaryObj.employeeId).subscribe((res: any)=>{
      debugger;
      res.data.forEach((element:any) => {
        debugger;
        this.totalAdvAmount = this.totalAdvAmount + element.advanceAmount;
        this.salaryObj.totalAdvance = this.totalAdvAmount;
      });
      console.log('Advance - ' + this.totalAdvAmount);
    });
  }
  getAllLeaves(){
    debugger;
    this.leaveSrv.getAllLeavesByEmpId(this.salaryObj.employeeId).subscribe((res: any)=>{
      debugger;
      this.totalLeaves = res.data.length;
      this.salaryObj.presentDays = 30 - this.totalLeaves;
      console.log('Leaves - ' + this.totalLeaves);
    });
  }
  calculateSalary(){
    debugger;
    const empData = this.employeeArr.find(m => m.empId == this.salaryObj.employeeId);
    let perDaySalary: number = 0;
    if(empData != null && empData.salary != null){
      perDaySalary = empData.salary/30;
      this.salaryObj.salaryAmount = (this.salaryObj.presentDays * perDaySalary) - this.salaryObj.totalAdvance;
    }
    //this.salaryObj.salaryAmount = empData
  }
}
