import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdvanceService {
  readonly payrollAPIUrl = "https://localhost:7091/api/Advance";
  constructor(private http: HttpClient) { }

  getAllAdvance(): Observable<any>{
    //return this.http.get('https://onlinetestapi.gerasim.in/api/TeamSync/GetAllAdvance');
    return this.http.get(this.payrollAPIUrl);
  }
  createAdvance(obj:any): Observable<any>{
    debugger;
    //return this.http.post('https://onlinetestapi.gerasim.in/api/TeamSync/AddAdvance',obj);
    return this.http.post(this.payrollAPIUrl,obj);
  }
  updateAdvance(id:number|string, obj:any): Observable<any>{
    debugger;
    //return this.http.post('https://onlinetestapi.gerasim.in/api/TeamSync/UpdateAdvance',obj);
    return this.http.put(this.payrollAPIUrl + `/${id}`, obj);
  }
  getAllAdvanceById(id:number): Observable<any>{
    //return this.http.get('https://onlinetestapi.gerasim.in/api/TeamSync/GetAllAdvanceByEmpId?empid=' + id);
    return this.http.get(this.payrollAPIUrl + `/${id}`);
  }
  deleteAdvanceById(id:number): Observable<any>{
    //return this.http.get('https://onlinetestapi.gerasim.in/api/TeamSync/DeleteAdvanceById?advanceid=' + id);
    return this.http.delete(this.payrollAPIUrl + `/${id}`);
  }
  getAllAdvanceByEmpId(empId:number): Observable<any>{
    debugger;
    //return this.http.get('https://onlinetestapi.gerasim.in/api/TeamSync/GetAllAdvanceByEmpId?empid=' + id);
    return this.http.get(this.payrollAPIUrl + `/GetAllAdvanceByEmpId/${empId}`);
  }
}
