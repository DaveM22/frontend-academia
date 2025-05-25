import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { AuthModule, AuthService } from '@auth0/auth0-angular';
import { ButtonModule } from 'primeng/button';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ButtonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent  {
  constructor(@Inject(DOCUMENT) public document:Document,public auth: AuthService) {}
  
  

  login(): void {
    this.auth.loginWithRedirect();
  }

  logout(){
    this.auth.logout();
  }
}
