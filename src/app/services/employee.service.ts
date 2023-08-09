import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {Employee} from "../models/employee";

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) {
  }

  getEmployees(): Observable<Employee[]> {
    const apiUrl = environment.apiUrl + '/employee';
    return this.http.get<Employee[]>(apiUrl);
  }

  deleteEmployee(id: number): Observable<void> {
    const apiUrl = environment.apiUrl + `/employee/${id}`;
    return this.http.delete<void>(apiUrl);
  }

  editEmployee(id: number, request: Employee): Observable<Employee> {
    const apiUrl = environment.apiUrl + `/employee/${id}`;
    return this.http.put<Employee>(apiUrl, request);
  }

  createEmployee(request: Employee): Observable<Employee> {
    const apiUrl = environment.apiUrl + `/employee/`;
    return this.http.post<Employee>(apiUrl, request);
  }
}
