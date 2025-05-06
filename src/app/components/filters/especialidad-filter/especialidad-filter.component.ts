import { Component, EventEmitter, OnDestroy, Output } from '@angular/core';
import { Store } from '@ngxs/store';
import { DropdownModule } from 'primeng/dropdown';
import { Observable } from 'rxjs';
import { Especialidad } from '../../../entities/especialidad';
import { EspecialidadState } from '../../../store/states/api/especialidad.state';
import { GetEspecialidadAction } from '../../../store/actions/api/especialidad.action';
import { CommonModule } from '@angular/common';
import { ClearSelectedEspecialidadFilter, SelectedEspecialidadFilterAction } from '../../../store/actions/pages/app.action';
import { FormsModule } from '@angular/forms';
import { ClearPlanes } from '../../../store/actions/api/planes.action';
import { SelectModule } from 'primeng/select';
import { ClearMateriaAction } from '../../../store/actions/pages/materia.action';
import { ClearAlumnoListAction } from '../../../store/actions/api/persona.action';
@Component({
  selector: 'app-especialidad-filter',
  standalone: true,
  imports: [SelectModule, CommonModule, FormsModule],
  templateUrl: './especialidad-filter.component.html',
  styleUrl: './especialidad-filter.component.scss'
})
export class EspecialidadFilterComponent {
  especialiades$:Observable<Especialidad[]> = this.store.select(EspecialidadState.getEspecialidades);
  loading$:Observable<boolean> = this.store.select(EspecialidadState.getLoading);
  especialidad!:Especialidad;
  @Output() selectionChange = new EventEmitter<Especialidad>();
  constructor(private store:Store){
    this.store.dispatch(new GetEspecialidadAction);
  }


  onChangeEspecialidad(){
    this.selectionChange.emit(this.especialidad)
  }

  onClear(){
    this.store.dispatch(new ClearSelectedEspecialidadFilter());
    this.store.dispatch(new ClearPlanes);
    this.store.dispatch(new ClearMateriaAction);
    this.store.dispatch(new ClearAlumnoListAction);
  }

}
