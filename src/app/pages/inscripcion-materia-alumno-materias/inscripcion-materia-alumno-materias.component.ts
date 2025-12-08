import { Component, OnDestroy, OnInit } from '@angular/core';
import { EspecialidadFilterComponent } from '../../components/filters/especialidad-filter/especialidad-filter.component';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { MessagesModule } from 'primeng/messages';
import { TableModule } from 'primeng/table';
import { ToolbarModule } from 'primeng/toolbar';
import { Store } from '@ngxs/store';
import { firstValueFrom, lastValueFrom, Observable, Subject } from 'rxjs';
import { Alumno } from '../../entities/alumno';
import { AlumnoFilter, MateriaFilter } from '../../entities/filter';
import { Materia } from '../../entities/materia';
import { GetByIdForInscripcion } from '../../store/actions/api/materia.action';
import { GetAlumnoByIdAction } from '../../store/actions/api/persona.action';
import { MateriaState } from '../../store/states/api/materia.state';
import { AppPageState } from '../../store/states/page/app.state';
import { PersonaPageState } from '../../store/states/page/persona.state';
import { Router } from '@angular/router';
import { GeneralLoadingAction } from '../../store/actions/pages/app.action';
import { filter, distinctUntilChanged, takeUntil, concatMap, last, take, first } from 'rxjs/operators';
import { MessageModule } from 'primeng/message';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { BlockUiComponent } from '../../components/util/block-ui/block-ui.component';
@Component({
  selector: 'app-inscripcion-materia-alumno-materias',
  standalone: true,
  imports: [CommonModule,ToolbarModule, TableModule, ButtonModule, BlockUiComponent, IconFieldModule, InputIconModule, MessageModule, InputTextModule, ProgressSpinnerModule],
  templateUrl: './inscripcion-materia-alumno-materias.component.html',
  styleUrl: './inscripcion-materia-alumno-materias.component.scss'
})
export class InscripcionMateriaAlumnoMateriasComponent implements OnInit, OnDestroy {
  persona$:Observable<Alumno | null> = this.store.select(PersonaPageState.getAlumnoSelected);
  personaid$:Observable<string> = this.store.select(AppPageState.getPersonId);
  materias$:Observable<Materia[]> = this.store.select(MateriaState.getMaterias);
  persona!:Alumno;
  materias:Materia[] = [];
  loading$: boolean = true;
  constructor(private store:Store, private router:Router){}


private destroy$ = new Subject<void>();

async ngOnInit(): Promise<void> {
    try {
 
      const personId = await firstValueFrom(
        this.personaid$.pipe(
          filter(id => id !== '')
        )
      );
      const filters = new AlumnoFilter();
      await firstValueFrom(this.store.dispatch(new GetAlumnoByIdAction(personId, filters)));

      const persona = await firstValueFrom(
        this.persona$.pipe(
          filter(p => p !== null)
        )
      );

      const materiaFilter = new MateriaFilter();
      materiaFilter.alumnnoId = persona!._id;
      materiaFilter.planId = persona!.plan._id;
      await firstValueFrom(this.store.dispatch(new GetByIdForInscripcion(materiaFilter)));

      this.materias = await firstValueFrom(
        this.materias$.pipe(
          filter(p => p !== null)
        )
      );
      this.loading$ = false;

    } catch (err) {
      console.error('Error en el flujo', err);
    }
  }

ngOnDestroy() {
  this.destroy$.next();
  this.destroy$.complete();

}

  redirectToCursosDisponibles(materiaId:string){
    this.router.navigate([`inscripcion-catedra/cursos-disponibles/${materiaId}`])
  }


}
