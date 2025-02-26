import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { MessagesModule } from 'primeng/messages';
import { PanelModule } from 'primeng/panel';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { EspecialidadBorrarComponent } from '../especialidad-borrar/especialidad-borrar.component';
import { Observable } from 'rxjs';
import { Store } from '@ngxs/store';
import { UsuarioState } from '../../store/states/api/usuario.state';
import { Usuario } from '../../entities/usuario';
import { GetUsuarioListaAction } from '../../store/actions/api/usuarios.action';
import { Router } from '@angular/router';

@Component({
  selector: 'app-usuario-lista',
  standalone: true,
  imports: [CommonModule, TableModule, ButtonModule, MessagesModule, PanelModule, ToastModule, IconFieldModule, InputTextModule, InputIconModule],
  templateUrl: './usuario-lista.component.html',
  styleUrl: './usuario-lista.component.scss'
})
export class UsuarioListaComponent implements OnInit {

  usuarios$:Observable<Usuario[]> = this.store.select(UsuarioState.getUsuarios) 
  loading$:Observable<boolean> = this.store.select(UsuarioState.getLoading);
  error$:Observable<boolean> = this.store.select(UsuarioState.getError);
  errorMessage$:Observable<string> = this.store.select(UsuarioState.getErrorMessage)
  constructor(private store:Store, private router:Router){}


  ngOnInit(): void {
    this.store.dispatch(new GetUsuarioListaAction());
  }

  redirigirEditarUsuario(id:string){
    this.router.navigate([`usuarios/editar/${id}`]);
  }

  redirigirNuevoUsuario(){
    this.router.navigate([`usuarios/nuevo`]);
  }

}
