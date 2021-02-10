import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../model/user';
import { LogService } from './log.service';

const API = environment.urlCrud;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private log:LogService) { }

  public create(user:User) : Observable<User> {
    return this.http.post<User>(`${API}/users`, user);
  }
  
  public readAll() : Observable<Array<User>> {
    return this.http.get<Array<User>>(`${API}/users`);
  }
  
  public read(id) : Observable<User> {
    return this.http.get<User>(`${API}/users/${id}`);
  }

  public update(user:User) : Observable<User> {
    return this.http.put<User>(`${API}/users/${user._id}`, user);
  }

  public satusApp(): Observable<any> {
    return this.http.get<any>(`${API}/status/app`);
  }
  
  public satusDb(): Observable<any> {
    return this.http.get<any>(`${API}/status/db`);
  }
}
