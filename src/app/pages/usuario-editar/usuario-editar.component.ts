import { Component, OnInit } from '@angular/core';
import { UsuarioFormComponent } from '../../components/forms/usuario-form/usuario-form.component';
import { Observable } from 'rxjs';
import { Store } from '@ngxs/store';
import { UsuarioPageState } from '../../store/states/page/usuario.state';
import { Usuario } from '../../entities/usuario';
import { CommonModule } from '@angular/common';
import { GetByIdUsuarioAction } from '../../store/actions/api/usuarios.action';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-usuario-editar',
  standalone: true,
  imports: [UsuarioFormComponent, CommonModule],
  templateUrl: './usuario-editar.component.html',
  styleUrl: './usuario-editar.component.scss'
})
export class UsuarioEditarComponent implements OnInit {
  usuario$:Observable<Usuario | null> = this.store.select(UsuarioPageState.getUsuarioSelected); 

  constructor(private store:Store, private activated:ActivatedRoute){}
  ngOnInit(): void {
    this.store.dispatch(new GetByIdUsuarioAction(this.activated.snapshot.params['id']));
  }


}
