import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Materia } from '../../entities/materia';
import { MateriaPageState } from '../../store/states/page/materia.page.state';
import { Store } from '@ngxs/store';
import { ActivatedRoute } from '@angular/router';
import { GetByIdMateriaAction } from '../../store/actions/api/materia.action';
import { AsignMateriaAction } from '../../store/actions/pages/materia.action';
import { MateriaFormComponent } from '../../components/forms/materia-form/materia-form.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-plan-materias-editar',
  standalone: true,
  imports: [MateriaFormComponent, CommonModule],
  templateUrl: './plan-materias-editar.component.html',
  styleUrl: './plan-materias-editar.component.scss'
})
export class PlanMateriasEditarComponent {
  materia$:Observable<Materia | null> = this.store.select(MateriaPageState.getMateriaSelected);
  materia!:Materia;
  constructor(private store:Store, private activatedRoute: ActivatedRoute){
      this.store.dispatch(new GetByIdMateriaAction(this.activatedRoute.snapshot.params['idMateria']));
  }

}
