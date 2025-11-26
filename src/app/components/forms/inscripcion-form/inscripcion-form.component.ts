import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { RippleModule } from 'primeng/ripple';
import { filter, firstValueFrom, lastValueFrom, Observable } from 'rxjs';
import { Alumno } from '../../../entities/alumno';
import { Store } from '@ngxs/store';
import { PersonaState } from '../../../store/states/api/persona.state';
import { PersonaPageState } from '../../../store/states/page/persona.state';
import { GetAlumnoByIdAction, UpdateManualLoading } from '../../../store/actions/api/persona.action';
import { CursosModalComponent } from '../../modals/cursos-modal/cursos-modal.component';
import { ShowCursoModal } from '../../../store/actions/pages/app.action';
import { Especialidad } from '../../../entities/especialidad';
import { EspecialidadPageState } from '../../../store/states/page/especialidad.state';
import { AppPageState } from '../../../store/states/page/app.state';
import { AlumnoFilter, CursoFilter, PlanFilter } from '../../../entities/filter';
import { GetByIdPlanAction, GetPlanAction } from '../../../store/actions/api/planes.action';
import { Plan } from '../../../entities/plan';
import { GetCursoAction } from '../../../store/actions/api/curso.action';
import { Curso } from '../../../entities/curso';
import { Condicion, CondicionList } from '../../../entities/enums';
import { DropdownModule } from 'primeng/dropdown';
import { KeyValuePipe } from '@angular/common';
import { AlumnoInscripcion, AlumnoInscripcionDto } from '../../../entities/alumno-inscripcion';
import { GetOneAlumnoInscripcionAction, PostAlumnoInscripcionAction, PutAlumnoInscripcionAction } from '../../../store/actions/api/alumno-inscripcion.action';
import { AlumnoInscripcionPageState } from '../../../store/states/page/alumno-inscripcion.state';
import { InputNumber, InputNumberModule } from 'primeng/inputnumber';
import { InputGroupModule } from 'primeng/inputgroup';
import { MessageService } from 'primeng/api';
import { MessagesModule } from 'primeng/messages';
import { AuthService } from '@auth0/auth0-angular';
import { environment } from '../../../../environments/environment';
import { ClearAlumnoInscripcionAction } from '../../../store/actions/pages/alumno-inscripcion.action';
import { PlanState } from '../../../store/states/api/plan.state';
import { ClearSelectedPersona } from '../../../store/actions/pages/persona.action';
import { SelectModule } from 'primeng/select';
@Component({
  selector: 'app-inscripcion-form',
  standalone: true,
  imports: [ReactiveFormsModule, InputTextModule, InputNumberModule, CardModule, ButtonModule, MessagesModule, RippleModule, CursosModalComponent, SelectModule,
    InputGroupModule],
  templateUrl: './inscripcion-form.component.html',
  styleUrl: './inscripcion-form.component.scss'
})
export class InscripcionFormComponent implements OnInit, OnDestroy {
  alumno$: Observable<Alumno | null> = this.store.select(PersonaPageState.getAlumnoSelected);
  alumnoInscripcion$: Observable<AlumnoInscripcion | null> = this.store.select(AlumnoInscripcionPageState.getAlumnoInscripcionSelected);
  especialidadSelected$: Observable<Especialidad | null> = this.store.select(AppPageState.getSelectedEspecialidad);
  planSelected$: Observable<Plan | null> = this.store.select(PlanState.getPlanSelected);
  cursoSelectedModal$: Observable<Curso | null> = this.store.select(AppPageState.getSelectedCursoInModal);
  alumno!: Alumno;
  alumnoId!: string;
  alumnoInscripcion!: AlumnoInscripcion
  alumnoInscripcionDto!: AlumnoInscripcionDto
  form!: FormGroup;
  role: string = 'Administrador';
  condiciones: any[] = CondicionList;
  constructor(private store: Store, private router: Router, private messageService: MessageService, private activatedRoute: ActivatedRoute, private authService: AuthService) { }
  ngOnDestroy(): void {
    this.store.dispatch(new ClearAlumnoInscripcionAction());
    this.store.dispatch(new ClearSelectedPersona);
  }

  ngOnInit(): void {

    this.condiciones = [Condicion.INSCRIPTO.toString(), Condicion.APROBADO.toString(), Condicion.REGULAR.toString()];

    this.form = new FormGroup({
      _id: new FormControl(null),
      alumno: new FormControl({ value: '', disabled: true }, [Validators.required]),
      alumnoId: new FormControl('', [Validators.required]),
      curso: new FormControl({ value: '', disabled: true }, [Validators.required]),
      cursoId: new FormControl('', [Validators.required]),
      condicion: new FormControl('', [Validators.required]),
      nota: new FormControl('')
    });



    this.authService.idTokenClaims$.subscribe(async role => {
      if (role && (role[environment.roleLogin] as Array<string>).some(r => r === 'Docente')) {
        this.role = 'Docente';
      }
    });


    if (this.activatedRoute.snapshot.params['idInscripcion']) {
      this.store.dispatch(new GetOneAlumnoInscripcionAction(this.activatedRoute.snapshot.params['idInscripcion']));

    }


    if (this.activatedRoute.snapshot.params['id'] && !this.activatedRoute.snapshot.params['idInscripcion']) {
      this.alumnoId = this.activatedRoute.snapshot.params['id'];

      let alumnoFilter = new AlumnoFilter();
      alumnoFilter.incluirInscripciones = false;
      this.store.dispatch(new GetAlumnoByIdAction(this.alumnoId, alumnoFilter));

    }




    this.cursoSelectedModal$.subscribe(curso => {
      if (curso) {
        this.form.patchValue({ 'curso': curso.descripcion, 'cursoId': curso._id });
      }
    });

    this.alumnoInscripcion$.subscribe(ai => {
      if (ai) {
        this.alumnoInscripcion = ai;
        this.form.patchValue({ '_id': this.alumnoInscripcion._id, 'alumno': `${this.alumnoInscripcion.alumno!.apellido} ${this.alumnoInscripcion.alumno!.nombre}`, 'alumnoId': this.alumnoInscripcion.alumno!._id, 'condicion': this.alumnoInscripcion.condicion, nota: this.alumnoInscripcion.nota, 'curso': this.alumnoInscripcion.curso?.descripcion, 'cursoId': this.alumnoInscripcion.curso?._id })
      }
    });

    this.alumno$.subscribe(a => {
      if (a) {
        this.alumno = a;
        this.form.patchValue({ 'alumno': `${this.alumno.apellido} ${this.alumno.nombre}`, 'alumnoId': this.alumno._id })
      }
    });


  }

  onSubmit() {
    this.alumnoInscripcion = this.form.value
    if (this.alumnoInscripcion._id === null) {
      this.alumnoInscripcionDto = this.form.value;
      this.store.dispatch(new PostAlumnoInscripcionAction(this.alumnoInscripcionDto)).subscribe(() => {
        this.router.navigate([`/inscripciones/alumnos/${this.alumnoId}`]);
        this.messageService.add({ severity: 'success', summary: 'Crear inscripción', detail: 'Se ha registrado la inscripción' });
      });
    }
    else {
      this.alumnoInscripcionDto = this.form.value;
      this.store.dispatch(new PutAlumnoInscripcionAction(this.alumnoInscripcion._id, this.alumnoInscripcionDto)).subscribe(() => {
        this.router.navigate([`/inscripciones/alumnos/${this.alumnoId}`]);
        this.messageService.add({ severity: 'success', summary: 'Editar inscripción', detail: 'Se han guardado los cambios de la inscripción' });
      });
    }
  }

  toggleModalCursos() {
    this.store.dispatch(new ShowCursoModal(true));
  }

  redirect() {
    if (this.role === 'Docente') {
      this.router.navigate([`docente/cursos-inscripciones/${this.alumnoInscripcion.curso?._id}`]);
    } else {
      this.router.navigate([`/inscripciones/alumnos/${this.alumno._id}`]);
    }
  }

}
