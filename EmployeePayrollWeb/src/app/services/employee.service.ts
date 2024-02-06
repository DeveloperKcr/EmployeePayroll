import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  readonly payrollAPIUrl = "https://localhost:7091/api/Employee";
  constructor(private http: HttpClient) { }

  getAllEmployees(): Observable<any>{
    //return this.http.get('http://onlinetestapi.gerasim.in/api/TeamSync/GetAllEmployee');
    return this.http.get(this.payrollAPIUrl);
  }
  createEmployee(obj:any): Observable<any>{
    //return this.http.post('http://onlinetestapi.gerasim.in/api/TeamSync/CreateEmployee',obj);
    return this.http.post(this.payrollAPIUrl,obj);
  }
  updateEmployee(id:number|string, obj:any): Observable<any>{
    //return this.http.post('http://onlinetestapi.gerasim.in/api/TeamSync/UpdateEmployee',obj);
    return this.http.put(this.payrollAPIUrl + `/${id}`, obj);
  }
  getAllEmployeeById(id:number): Observable<any>{
    //return this.http.get('http://onlinetestapi.gerasim.in/api/TeamSync/GetEmployeeByEmpId?empid=' + id);
    return this.http.get(this.payrollAPIUrl + `/${id}`);
  }
  deleteEmployeeById(id:number): Observable<any>{
    //return this.http.get('http://onlinetestapi.gerasim.in/api/TeamSync/DeleteEmployeeByEmpId?empid=' + id);
    return this.http.delete(this.payrollAPIUrl + `/${id}`);
  }
}
