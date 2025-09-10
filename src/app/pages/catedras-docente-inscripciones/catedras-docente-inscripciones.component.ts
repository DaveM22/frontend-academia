import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { ButtonModule } from 'primeng/button';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { MessagesModule } from 'primeng/messages';
import { PanelModule } from 'primeng/panel';
import { TableModule } from 'primeng/table';
import { Skeleton } from 'primeng/skeleton';
import { ToolbarModule } from 'primeng/toolbar';
import { GetInscripcionByCursoAction, GetOneAlumnoInscripcionAction } from '../../store/actions/api/alumno-inscripcion.action';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, firstValueFrom, Observable } from 'rxjs';
import { AlumnoInscripcion } from '../../entities/alumno-inscripcion';
import { AlumnoInscripcionState } from '../../store/states/api/alumno-incripcion.state';
import { Curso } from '../../entities/curso';
import { CursoState } from '../../store/states/api/curso.state';
import { AppPageState } from '../../store/states/page/app.state';
import { CursoPageState } from '../../store/states/page/curso.state';
import { GetByIdCursoAction } from '../../store/actions/api/curso.action';
import { Materia } from '../../entities/materia';
import { Comision } from '../../entities/comision';

@Component({
  selector: 'app-catedras-docente-inscripciones',
  standalone: true,
  imports: [CommonModule, ToolbarModule, PanelModule, TableModule, ButtonModule, IconFieldModule, InputIconModule, MessagesModule, InputTextModule, Skeleton],
  templateUrl: './catedras-docente-inscripciones.component.html',
  styleUrl: './catedras-docente-inscripciones.component.scss'
})
export class CatedrasDocenteInscripcionesComponent implements OnInit {

  inscripciones$: Observable<AlumnoInscripcion[]> = this.store.select(AlumnoInscripcionState.getInscripciones);
  curso$: Observable<Curso | null> = this.store.select(CursoPageState.getCursoSelected);
  inscripciones: AlumnoInscripcion[] = [];
  loading$: boolean = true;
  cursoId: string = '';
  materia: Materia | null = null;
  comision: Comision | null = null;
  constructor(private store: Store, private router: ActivatedRoute, private route: Router) { }

  async ngOnInit(): Promise<void> {
    this.loading$ = true;
    this.cursoId = this.router.snapshot.params['idCurso'];
    this.store.dispatch(new GetByIdCursoAction(this.cursoId));
    const cursoSelected = await firstValueFrom(this.curso$.pipe(filter(curso => curso !== null)));
    this.materia = cursoSelected!.materia;
    this.comision = cursoSelected!.comision;
    this.store.dispatch(new GetInscripcionByCursoAction(this.cursoId));
    const inscripciones = await firstValueFrom(this.inscripciones$.pipe(filter(inscripciones => inscripciones.length > 0)));
    this.inscripciones = inscripciones;
    this.loading$ = false;
  }


  redirectToInscripcionForm(idInscripcion: string) {
    this.loading$ = true;
    this.store.dispatch(new GetOneAlumnoInscripcionAction(idInscripcion)).subscribe(() => {
      this.route.navigate([`docente/${this.router.snapshot.params['id']}/cursos-inscripciones/${this.cursoId}/inscripciones/${idInscripcion}`]);
    })

  }

}
