import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { PanelModule } from 'primeng/panel';
import { DialogModule } from 'primeng/dialog';
import { TableModule } from 'primeng/table';
import { EspecialidadBorrarComponent } from '../especialidad-borrar/especialidad-borrar.component';
import { Observable } from 'rxjs';
import { Store } from '@ngxs/store';
import { ParametroState } from '../../store/states/api/parametro.state';
import { Parametro } from '../../entities/parametro';
import { GetParametrosAction, PutParametroAction } from '../../store/actions/api/parametros.action';
import { ToggleSwitch, ToggleSwitchModule } from 'primeng/toggleswitch';
import { FormsModule } from '@angular/forms';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { BlockUiComponent } from '../../components/util/block-ui/block-ui.component';
import { AppPageState } from '../../store/states/page/app.state';

@Component({
  selector: 'app-parametro-lista',
  imports: [FormsModule,CommonModule, TableModule, ButtonModule, MessageModule, PanelModule, IconFieldModule, InputTextModule, InputIconModule, ToggleSwitchModule, ProgressSpinnerModule, DialogModule, BlockUiComponent],
  templateUrl: './parametro-lista.component.html',
  styleUrl: './parametro-lista.component.css',
  standalone: true
})
export class ParametroListaComponent implements OnInit {

  screenSize = { width: 0, height: 0 };
  rowsPerPage = 5;

  public parametros$: Observable<Parametro[]> = this.store.select(ParametroState.getParametros)

  public loading$:Observable<boolean> = this.store.select(AppPageState.getFormLoading);

  public error$:Observable<boolean> = this.store.select(ParametroState.getError);

  public errorMessage$:Observable<string> = this.store.select(ParametroState.getErrorMessage);

  infoVisible = false;
  selectedParametro: Parametro | null = null;

  constructor(private store:Store){}
  ngOnInit(): void {
    this.updateRowsPerPage();
       this.store.dispatch(new GetParametrosAction());
  }

  @HostListener('window:resize')
  onResize() {
    this.updateRowsPerPage();
  }

  private updateRowsPerPage() {
    const width = window.innerWidth;
    if (width < 600) {
      this.rowsPerPage = 6;
    } else if (width < 960) {
      this.rowsPerPage = 5;
    } else if (width < 1280) {
      this.rowsPerPage = 8;
    } else if (width < 1920) {
      this.rowsPerPage = 10;
    } else {
      this.rowsPerPage = 10;
    }
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

openInfo(parametro: Parametro) {
  this.selectedParametro = parametro;
  this.infoVisible = true;
}

closeInfo() {
  this.infoVisible = false;
}
}
