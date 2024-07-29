import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-callback',
  standalone: true,
  imports: [],
  templateUrl: './callback.component.html',
  styleUrl: './callback.component.scss'
})
export class CallbackComponent implements OnInit {
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    // Maneja la lógica después de que el usuario se autentica correctamente
    this.authService.handleRedirectCallback();
  }
}
