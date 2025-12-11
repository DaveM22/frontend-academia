import { Component, OnInit } from '@angular/core';
import { Especialidad } from '../../entities/especialidad';
import { EspecialidadFormComponent } from '../../components/forms/especialidad-form/especialidad-form.component';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { GetByIdEspecialidadAction } from '../../store/actions/api/especialidad.action';
import { Observable } from 'rxjs';
import { EspecialidadState } from '../../store/states/api/especialidad.state';
import { CommonModule } from '@angular/common';
import { EspecialidadPageState } from '../../store/states/page/especialidad.state';

@Component({
  selector: 'app-especialidad-editar',
  standalone: true,
  imports: [CommonModule,EspecialidadFormComponent],
  templateUrl: './especialidad-editar.component.html',
  styleUrl: './especialidad-editar.component.scss'
})
export class EspecialidadEditarComponent {
  especialidad$:Observable<Especialidad | null> = this.store.select(EspecialidadPageState.getEspecialidadSelected);
  especialidad!:Especialidad;
  constructor(private store:Store, private router:ActivatedRoute){
    
  }

    ngOnInit(): void {
    this.especialidad$.subscribe(x => {
      this.especialidad = x!;
    })
    this.store.dispatch(new GetByIdEspecialidadAction(this.router.snapshot.params['id']));
  }



}
