import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SalaryService {

  readonly payrollAPIUrl = "https://localhost:7091/api/Salary";
  constructor(private http: HttpClient) { }

  getAllSalary(): Observable<any>{
    //return this.http.get('https://onlinetestapi.gerasim.in/api/TeamSync/GetAllSalarys');
    return this.http.get(this.payrollAPIUrl);
  }
  createSalary(obj:any): Observable<any>{
    debugger;
    //return this.http.post('https://onlinetestapi.gerasim.in/api/TeamSync/AddSalary',obj);
    return this.http.post(this.payrollAPIUrl,obj);
  }
  updateSalary(id:number|string, obj:any): Observable<any>{
    debugger;
    //return this.http.post('https://onlinetestapi.gerasim.in/api/TeamSync/UpdateSalary',obj);
    return this.http.put(this.payrollAPIUrl + `/${id}`, obj);
  }
  getAllSalaryById(id:number): Observable<any>{
    //return this.http.get('https://onlinetestapi.gerasim.in/api/TeamSync/GetAllSalarysByEmpId?empid=' + id);
    return this.http.get(this.payrollAPIUrl + `/${id}`);
  }
  deleteSalaryById(id:number): Observable<any>{
    //return this.http.get('https://onlinetestapi.gerasim.in/api/TeamSync/DeleteSalaryById?leaveid=' + id);
    return this.http.delete(this.payrollAPIUrl + `/${id}`);
  }
}
