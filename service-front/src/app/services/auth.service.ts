import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { JwtHelperService } from "@auth0/angular-jwt";
import { Credencial } from '../model/credencial';
import { Autorizacao } from '../model/autorizacao';

const jwtHelper = new JwtHelperService();
const API = environment.urlAuth;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private router: Router) { }

  public login(credencial: Credencial) : Observable<Autorizacao> {
    return this.http.post<any>(API+'/login', credencial);
  }
 

  public logout(){
    this.router.navigateByUrl('login');
  }

}
