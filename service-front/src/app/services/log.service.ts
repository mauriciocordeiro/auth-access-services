import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Log } from '../model/log';

const API = environment.urlLog;

@Injectable({
  providedIn: 'root'
})
export class LogService {

  constructor(private http: HttpClient) { }

  create(item: Log): Observable<Log> {
    return this.http.post<Log>(`${API}/logs`, item);
  }

  readAll(): Observable<Array<Log>> {
    return this.http.get<Array<Log>>(`${API}/logs`);
  }

  public satusApp(): Observable<any> {
    return this.http.get<any>(`${API}/status/app`);
  }
  
  public satusDb(): Observable<any> {
    return this.http.get<any>(`${API}/status/db`);
  }
}
