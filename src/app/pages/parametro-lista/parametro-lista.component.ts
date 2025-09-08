import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { PanelModule } from 'primeng/panel';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { EspecialidadBorrarComponent } from '../especialidad-borrar/especialidad-borrar.component';
import { Observable } from 'rxjs';
import { Store } from '@ngxs/store';
import { ParametroState } from '../../store/states/api/parametro.state';
import { Parametro } from '../../entities/parametro';
import { GetParametrosAction, PutParametroAction } from '../../store/actions/api/parametros.action';
import { ToggleSwitch, ToggleSwitchModule } from 'primeng/toggleswitch';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-parametro-lista',
  imports: [FormsModule,CommonModule, TableModule, ButtonModule, MessageModule, PanelModule, ToastModule, IconFieldModule, InputTextModule, InputIconModule, ToggleSwitchModule],
  templateUrl: './parametro-lista.component.html',
  styleUrl: './parametro-lista.component.css',
  standalone: true
})
export class ParametroListaComponent implements OnInit {

  screenSize = { width: 0, height: 0 };

  public parametros$: Observable<Parametro[]> = this.store.select(ParametroState.getParametros)

  public loading$:Observable<boolean> = this.store.select(ParametroState.getLoading);

  public error$:Observable<boolean> = this.store.select(ParametroState.getError);

  public errorMessage$:Observable<string> = this.store.select(ParametroState.getErrorMessage);

  constructor(private store:Store){}
  ngOnInit(): void {
 
       this.store.dispatch(new GetParametrosAction());
  }

  parametros!: Parametro[];

onToggle(parametro: Parametro, checked: boolean) {
  // clonamos el objeto para no mutar el store
  const actualizado = { ...parametro, activo:checked };
  this.store.dispatch(new PutParametroAction(actualizado));
}

trackById(index: number, item: Parametro) {
  return item._id;  
}
}
