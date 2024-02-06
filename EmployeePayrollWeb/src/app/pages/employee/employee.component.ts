import { Component, OnInit } from '@angular/core';
import { employee } from 'src/app/classes/employee';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  employeeArray: employee[] = [];
  employeeObj: employee = new employee();
  constructor(private empSrv: EmployeeService) {
    this.resetObj();
  }

  ngOnInit(): void {
    this.loadAllEmployee();
  }

  loadAllEmployee() {
    this.empSrv.getAllEmployees().subscribe((res: any) => {
      this.employeeArray = res.data;
    });
  }
  onSave() {
    this.empSrv.createEmployee(this.employeeObj).subscribe((res: any) => {
      debugger;
      if (res.succeeded) {
        this.loadAllEmployee();
        this.resetObj();
      }
      alert(res.messages[0]);
    });
  }
  onUpdate() {
    this.empSrv.updateEmployee(this.employeeObj.empId, this.employeeObj).subscribe((res: any) => {
      debugger;
      if (res.succeeded) {
        this.loadAllEmployee();        
        this.resetObj();
      } 
      alert(res.messages[0]);
    });
  }
  resetObj() {
    this.employeeObj = new employee();
  }

  onEdit(id: number) {
    this.empSrv.getAllEmployeeById(id).subscribe((res: any) => {
      this.employeeObj = res.data;
    });
  }

  onDelete(id: number) {
    this.empSrv.deleteEmployeeById(id).subscribe((res: any) => {
      debugger;
      if (res.succeeded) {
        this.loadAllEmployee();
      }
      alert(res.messages[0]);
    });
  }
}
