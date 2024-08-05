import { Component } from '@angular/core';
import { UsuarioFormComponent } from '../../components/forms/usuario-form/usuario-form.component';
import { Usuario } from '../../entities/usuario';

@Component({
  selector: 'app-usuario-nuevo',
  standalone: true,
  imports: [UsuarioFormComponent],
  templateUrl: './usuario-nuevo.component.html',
  styleUrl: './usuario-nuevo.component.scss'
})
export class UsuarioNuevoComponent {

  usuario:Usuario = new Usuario();
}
