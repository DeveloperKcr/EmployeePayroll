import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {
  readonly payrollAPIUrl = "https://localhost:7091/api/Attendance";
  constructor(private http: HttpClient) { }

  getAllAttendance(): Observable<any>{
    //return this.http.get('https://onlinetestapi.gerasim.in/api/TeamSync/GetAllAttendance');
    return this.http.get(this.payrollAPIUrl);
  }
  createAttendance(obj:any): Observable<any>{
    debugger;
    //return this.http.post('https://onlinetestapi.gerasim.in/api/TeamSync/AddAttendance',obj);
    return this.http.post(this.payrollAPIUrl,obj);
  }
  updateAttendance(id:number|string, obj:any): Observable<any>{
    debugger;
    //return this.http.post('https://onlinetestapi.gerasim.in/api/TeamSync/UpdateAttendance',obj);
    return this.http.put(this.payrollAPIUrl + `/${id}`, obj);
  }
  getAllAttendanceById(id:number): Observable<any>{
    //return this.http.get('https://onlinetestapi.gerasim.in/api/TeamSync/GetAttendanceById?id=' + id);
    return this.http.get(this.payrollAPIUrl + `/${id}`);
  }
  deleteAttendanceById(id:number): Observable<any>{
    //return this.http.get('https://onlinetestapi.gerasim.in/api/TeamSync/DeleteAttendanceById' + id);
    return this.http.delete(this.payrollAPIUrl + `/${id}`);
  }
}
