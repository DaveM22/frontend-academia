import { Component, OnInit } from '@angular/core';
import { MateriaFormComponent } from '../../components/forms/materia-form/materia-form.component';
import { Store } from '@ngxs/store';
import { AsignMateriaAction } from '../../store/actions/pages/materia.action';
import { Materia } from '../../entities/materia';
import { Observable } from 'rxjs';
import { MateriaPageState } from '../../store/states/page/materia.page.state';
import { CommonModule } from '@angular/common';
import { GetEspecialidadAction } from '../../store/actions/api/especialidad.action';
import { Especialidad } from '../../entities/especialidad';
import { EspecialidadState } from '../../store/states/api/especialidad.state';

@Component({
  selector: 'app-plan-materias-nuevo',
  standalone: true,
  imports: [MateriaFormComponent, CommonModule],
  templateUrl: './plan-materias-nuevo.component.html',
  styleUrl: './plan-materias-nuevo.component.scss'
})
export class PlanMateriasNuevoComponent implements OnInit {
  especialidades$: Observable<Especialidad[]> = this.store.select(EspecialidadState.getEspecialidades);
  materia$:Observable<Materia | null> = this.store.select(MateriaPageState.getMateriaSelected);

  constructor(private store: Store) {

  }
  ngOnInit(): void {

   this.store.dispatch(new AsignMateriaAction(new Materia()));
  }
}
