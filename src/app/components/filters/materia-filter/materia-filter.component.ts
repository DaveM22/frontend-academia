import { Component, OnInit } from '@angular/core';
import { filter, firstValueFrom, Observable } from 'rxjs';
import { Materia } from '../../../entities/materia';
import { MateriaState } from '../../../store/states/api/materia.state';
import { Store } from '@ngxs/store';
import { ClearSelectedMateriaInFilter, SelectedMateriaInFilter } from '../../../store/actions/pages/app.action';
import { GetByIdForInscripcion, GetMateriasAction } from '../../../store/actions/api/materia.action';
import { MateriaFilter } from '../../../entities/filter';
import { PersonaPageState } from '../../../store/states/page/persona.state';
import { Alumno } from '../../../entities/alumno';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';

@Component({
  selector: 'app-materia-filter',
  standalone: true,
  imports: [DropdownModule, CommonModule, FormsModule],
  templateUrl: './materia-filter.component.html',
  styleUrl: './materia-filter.component.scss'
})
export class MateriaFilterComponent implements OnInit {
  materias$:Observable<Materia[]> = this.store.select(MateriaState.getMaterias);
  loading$:Observable<boolean> = this.store.select(MateriaState.getLoading);
  alumno$:Observable<Alumno | null> = this.store.select(PersonaPageState.getAlumnoSelected);
  materia!:Materia;
  constructor(private store:Store){

  }
  async ngOnInit(): Promise<void> {
    const alumnoSelected = await firstValueFrom( this.alumno$.pipe(filter(x => x !== null)));
    if (alumnoSelected) {
      let materiaFilter = new MateriaFilter();
      materiaFilter.alumnnoId = alumnoSelected._id;
      materiaFilter.planId = alumnoSelected.plan._id;
      this.store.dispatch(new GetByIdForInscripcion(materiaFilter));
    }
  }

  onChangeEspecialidad(){
    this.store.dispatch(new SelectedMateriaInFilter(this.materia));
  }

  onClear(){
    this.store.dispatch(new ClearSelectedMateriaInFilter());
  }
}
