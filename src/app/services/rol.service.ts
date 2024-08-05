import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { map, take, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RolService {
  constructor(private authService: AuthService, private router: Router) {}

  getRole() {
    return 

  }
}
