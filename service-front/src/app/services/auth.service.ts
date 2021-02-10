import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { JwtHelperService } from "@auth0/angular-jwt";
import { Credencial } from '../model/credencial';
import { User } from '../model/user';

const jwtHelper = new JwtHelperService();
const API = environment.urlAuth;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private router: Router) { }

  public login(credencial: Credencial) : Observable<any> {
    return this.http.post<any>(API+'/login', credencial);
  }
 
  public logout(){
    this.http.post<any>(API+'/logout', this.getUser());
    this.router.navigateByUrl('login');
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
