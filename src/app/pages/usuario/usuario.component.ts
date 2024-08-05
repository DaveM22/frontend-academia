import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PanelModule } from 'primeng/panel';

@Component({
  selector: 'app-usuario',
  standalone: true,
  imports: [PanelModule, RouterModule],
  templateUrl: './usuario.component.html',
  styleUrl: './usuario.component.scss'
})
export class UsuarioComponent {

}
