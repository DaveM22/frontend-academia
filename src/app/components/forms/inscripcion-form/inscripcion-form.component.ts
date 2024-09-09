import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';
import { Observable } from 'rxjs';
import { Alumno } from '../../../entities/alumno';
import { Store } from '@ngxs/store';
import { PersonaState } from '../../../store/states/api/persona.state';
import { PersonaPageState } from '../../../store/states/page/persona.state';
import { GetAlumnoByIdAction } from '../../../store/actions/api/persona.action';
import { CursosModalComponent } from '../../modals/cursos-modal/cursos-modal.component';
import { ShowCursoModal } from '../../../store/actions/pages/app.action';
import { Especialidad } from '../../../entities/especialidad';
import { EspecialidadPageState } from '../../../store/states/page/especialidad.state';
import { AppPageState } from '../../../store/states/page/app.state';
import { AlumnoFilter, CursoFilter, PlanFilter } from '../../../entities/filter';
import { GetPlanAction } from '../../../store/actions/api/planes.action';
import { Plan } from '../../../entities/plan';
import { GetCursoAction } from '../../../store/actions/api/curso.action';
import { Curso } from '../../../entities/curso';
import { Condicion, CondicionList } from '../../../entities/enums';
import { DropdownModule } from 'primeng/dropdown';
import { KeyValuePipe } from '@angular/common';
import { AlumnoInscripcion, AlumnoInscripcionDto } from '../../../entities/alumno-inscripcion';
import { PostAlumnoInscripcion } from '../../../store/actions/api/alumno-inscripcion.action';

@Component({
  selector: 'app-inscripcion-form',
  standalone: true,
  imports: [ReactiveFormsModule, KeyValuePipe, InputTextModule, CardModule, ButtonModule,ToastModule,  RippleModule, CursosModalComponent, DropdownModule],
  templateUrl: './inscripcion-form.component.html',
  styleUrl: './inscripcion-form.component.scss'
})
export class InscripcionFormComponent implements OnInit {
  alumno$:Observable<Alumno | null> = this.store.select(PersonaPageState.getAlumnoSelected);
  especialidadSelected$:Observable<Especialidad | null> = this.store.select(AppPageState.getSelectedEspecialidad);
  planSelected$:Observable<Plan | null> = this.store.select(AppPageState.getSelectedPlanInFilter);
  cursoSelectedModal$:Observable<Curso | null> = this.store.select(AppPageState.getSelectedCursoInModal);
  alumno!:Alumno;
  alumnoId!:string;
  alumnoInscripcion!:AlumnoInscripcion
  alumnoInscripcionDto!:AlumnoInscripcionDto
  form!: FormGroup;
  condiciones:any[] = CondicionList;
  constructor(private store:Store, private router:Router,private activatedRoute:ActivatedRoute){}

  ngOnInit(): void {
    this.condiciones = [Condicion.INSCRIPTO.toString()];
    this.especialidadSelected$.subscribe(x =>{
        if(x !== null){
          let filter = new PlanFilter();
          filter.especialidadId = x._id;
          this.store.dispatch(new GetPlanAction(filter));
        }
    })

    this.planSelected$.subscribe(x =>{
     if(x !== null){
      let filter = new CursoFilter();
      filter.planId = x!._id;
      this.store.dispatch(new GetCursoAction(filter));
     }
    })

    this.cursoSelectedModal$.subscribe(x => {
      if(x !== null){
        this.form.patchValue({'curso':x.descripcion, 'cursoId':x._id})
      }
    })

 


    this.form = new FormGroup({
      _id: new FormControl(null),
      alumno:new FormControl({value:'', disabled:true}, [Validators.required]),
      alumnoId:new FormControl('', [Validators.required]),
      curso: new FormControl({value:'', disabled:true}, [Validators.required]),
      cursoId: new FormControl('', [Validators.required]),
      condicion: new FormControl('', [Validators.required])
    });

    this.alumno$.subscribe(x => {
      if(x !== null){
        this.alumno = x;
        this.form.patchValue({'alumno':`${this.alumno.apellido} ${this.alumno.nombre}`, 'alumnoId':this.alumno._id})
      }
    })

    this.alumnoId = this.activatedRoute.snapshot.params['id']
    let filter = new AlumnoFilter();
    filter.incluirInscripciones = false;
    this.store.dispatch(new GetAlumnoByIdAction(this.alumnoId, filter));
  }

  onSubmit(){
    this.alumnoInscripcionDto = this.form.value
    this.store.dispatch(new PostAlumnoInscripcion(this.alumnoInscripcionDto)).subscribe(() => {
      this.router.navigate([`/inscripciones/alumnos/${this.alumnoId}`]);
    });
  }

  toggleModalCursos(){
    this.store.dispatch(new ShowCursoModal(true));
  }

  redirectInscripcionesAlumno(){
    this.router.navigate([`/inscripciones/alumnos/${this.alumnoId}`]);
  }



}
