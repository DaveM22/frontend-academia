import { Component, OnInit } from '@angular/core';
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
import { Observable } from 'rxjs';
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
import { filter, distinctUntilChanged } from 'rxjs/operators';
@Component({
  selector: 'app-inscripcion-materia-alumno-materias',
  standalone: true,
  imports: [CommonModule,ToolbarModule, TableModule, ButtonModule, IconFieldModule, InputIconModule, MessagesModule, InputTextModule],
  templateUrl: './inscripcion-materia-alumno-materias.component.html',
  styleUrl: './inscripcion-materia-alumno-materias.component.scss'
})
export class InscripcionMateriaAlumnoMateriasComponent implements OnInit {
  persona$:Observable<Alumno | null> = this.store.select(PersonaPageState.getAlumnoSelected);
  personaid$:Observable<string> = this.store.select(AppPageState.getPersonId);
  materias$:Observable<Materia[]> = this.store.select(MateriaState.getMaterias);
  persona!:Alumno;
  materias:Materia[] = [];
  loading$:Observable<boolean> = this.store.select(MateriaState.getLoading);
  constructor(private store:Store, private router:Router){}

  ngOnInit(): void {
    // Evitar disparos múltiples usando filter y distinctUntilChanged
    this.personaid$
      .pipe(
        filter((x: string) => x !== ''),
        distinctUntilChanged()
      )
      .subscribe((personId: string) => {
        let filters = new AlumnoFilter();
        this.store.dispatch(new GetAlumnoByIdAction(personId, filters));
      });

    this.persona$.subscribe(x => {
      if(x !== null){
        let filter = new MateriaFilter();
        filter.alumnnoId = x._id;
        filter.planId = x.plan._id;
        this.store.dispatch(new GetByIdForInscripcion(filter))
      }
    })

    this.materias$.subscribe(x => {
      this.materias = x;
    })
  }

  redirectToCursosDisponibles(materiaId:string){
    this.router.navigate([`inscripcion-catedra/cursos-disponibles/${materiaId}`])
  }
}
