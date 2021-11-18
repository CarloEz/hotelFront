import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private API: string = 'http://localhost:3000';

  constructor(private http: HttpClient, private router:Router) {
  }

  postLogin(form: any): any {
    return this.http.post(`${this.API}/auth/login`, form)
    .pipe(map((res:any)=>{
      localStorage.setItem('type',res.tipo);    
      localStorage.setItem('dir',res.correo);
      console.log(res); 
      return res;
    }))
  }

  postRegistro(form: any): any {
    return this.http.post(`${this.API}/auth/register`, form);
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('type');
    localStorage.removeItem('dir');
    this.router.navigate(['/panel/login']);
  }

  loggedIn(){
    return !!localStorage.getItem('token');
  }

  getToken(){
    return localStorage.getItem('token');
  }

  getType(tipo:string){
    if(localStorage.getItem('type')==tipo){
      return true;
    }
    return false;
  }

  getCorreo(){
    return localStorage.getItem('dir');
  }
}
