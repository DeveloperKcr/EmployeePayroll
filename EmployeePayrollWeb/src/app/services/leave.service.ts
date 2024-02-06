import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LeaveService {
  readonly payrollAPIUrl = "https://localhost:7091/api/Leave";
  constructor(private http: HttpClient) { }

  getAllLeave(): Observable<any>{
    //return this.http.get('https://onlinetestapi.gerasim.in/api/TeamSync/GetAllLeaves');
    return this.http.get(this.payrollAPIUrl);
  }
  createLeave(obj:any): Observable<any>{
    debugger;
    //return this.http.post('https://onlinetestapi.gerasim.in/api/TeamSync/AddLeave',obj);
    return this.http.post(this.payrollAPIUrl,obj);
  }
  updateLeave(id:number|string, obj:any): Observable<any>{
    debugger;
    //return this.http.post('https://onlinetestapi.gerasim.in/api/TeamSync/UpdateLeave',obj);
    return this.http.put(this.payrollAPIUrl + `/${id}`, obj);
  }
  getAllLeaveById(id:number): Observable<any>{
    //return this.http.get('https://onlinetestapi.gerasim.in/api/TeamSync/GetAllLeavesByEmpId?empid=' + id);
    return this.http.get(this.payrollAPIUrl + `/${id}`);
  }
  deleteLeaveById(id:number): Observable<any>{
    //return this.http.get('https://onlinetestapi.gerasim.in/api/TeamSync/DeleteLeaveById?leaveid=' + id);
    return this.http.delete(this.payrollAPIUrl + `/${id}`);
  }
  getAllLeavesByEmpId(empId:number): Observable<any>{
    debugger;
    //return this.http.get('https://onlinetestapi.gerasim.in/api/TeamSync/GetAllAdvanceByEmpId?empid=' + id);
    return this.http.get(this.payrollAPIUrl + `/GetAllLeavesByEmpId/${empId}`);
  }
}
