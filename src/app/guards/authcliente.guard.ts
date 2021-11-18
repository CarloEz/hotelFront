import { Injectable } from '@angular/core';
import { CanActivateChild, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})

export class AuthclienteGuard implements CanActivateChild {
  constructor(private authservice:AuthService, private router:Router){}

  canActivateChild(): boolean {
    if (this.authservice.loggedIn() && this.authservice.getType('cliente')) {
      return true;
    }else{
      console.log("salida");
      this.router.navigate(['/panel/login']);
      return false;
    }
  }
}
