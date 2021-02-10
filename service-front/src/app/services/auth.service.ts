import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { Credencial } from '../model/credencial';
import { User } from '../model/user';

const API = environment.urlAuth;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private router: Router) { }

  public login(credencial: Credencial) : Observable<any> {
    return this.http.post<any>(`${API}/login`, credencial);
  }
 
  public logout(){
    this.http.post<any>(`${API}/logout`, this.getUser());
    sessionStorage.clear();
    this.router.navigateByUrl('');
  }

  public satusApp(): Observable<any> {
    return this.http.get<any>(`${API}/status/app`);
  }
  
  public satusDb(): Observable<any> {
    return this.http.get<any>(`${API}/status/db`);
  }

  public setUser(user) {
    sessionStorage.setItem('user', JSON.stringify(user));
  }

  public getUser(): User {
    return JSON.parse(sessionStorage.getItem('user'));
  }

  public isLoggedIn(){
    let user = this.getUser();
    return user !== null;
  }

}
