import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngxs/store';
import { Alumno, AlumnoDto } from '../../../entities/alumno';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { PersonaPageState } from '../../../store/states/page/persona.state';
import { Persona, PersonaDto } from '../../../entities/persona';
import { PostAlumnoAction, PostProfesorAction, PutAlumnoAction, PutProfesorAction } from '../../../store/actions/api/persona.action';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { InputMaskModule } from 'primeng/inputmask';
import { PlanesModalComponent } from '../../modals/planes-modal/planes-modal.component';
import { ClearSelectedPlanInModal, ShowPlanModal } from '../../../store/actions/pages/app.action';
import { Observable } from 'rxjs';
import { PlanState } from '../../../store/states/api/plan.state';
import { AppPageState } from '../../../store/states/page/app.state';
import { Plan } from '../../../entities/plan';
import { TipoPersonaEnum } from '../../../util/EnumTipoPersona';
import { ClearSelectedPersona } from '../../../store/actions/pages/persona.action';
import { Profesor, ProfesorDto } from '../../../entities/profesor';
import { DatePipe } from '@angular/common';
import { ClearSelectedPlan } from '../../../store/actions/pages/plan.action';
@Component({
  selector: 'app-persona-form',
  standalone: true,
  imports: [ReactiveFormsModule, InputTextModule, CardModule, ButtonModule, RippleModule, InputMaskModule, PlanesModalComponent],
  templateUrl: './persona-form.component.html',
  styleUrl: './persona-form.component.scss',
  providers: [DatePipe]
})
export class PersonaFormComponent {
  @Input() title!: string;
  tipoPersona!: TipoPersonaEnum
  planSelected$: Observable<Plan | null> = this.store.select(AppPageState.getSelectedPlanInModal);
  alumnoSelected$: Observable<Alumno | null> = this.store.select(PersonaPageState.getAlumnoSelected)
  profesorSelected$: Observable<Profesor | null> = this.store.select(PersonaPageState.getProfesorSelected)
  personaSelected$: Observable<Persona | null> = this.store.select(PersonaPageState.getPersonaSelected)
  form!: FormGroup;
  persona!: Persona;
  alumno!: Alumno;
  profesor!: Profesor;
  personaDto!: PersonaDto;

  constructor(private store: Store, private router: Router, private messageService: MessageService, private datePipe: DatePipe) { }

  ngOnInit(): void {

    this.form = new FormGroup({
      _id: new FormControl(null),
      nombre: new FormControl('', [Validators.required]),
      apellido: new FormControl('', [Validators.required]),
      direccion: new FormControl('', [Validators.required]),
      email: new FormControl(''),
      telefono: new FormControl(''),
      fechaNacimiento: new FormControl('', [Validators.required]),
      planDescription: new FormControl({ value: '', disabled: true }, [Validators.required]),
      plan: new FormControl('', [Validators.required])

    });

    this.planSelected$.subscribe(x => {
      if (x !== null) {
        this.form.patchValue({ 'planDescription': x.descripcion, 'plan': x._id });
      }
    })
    this.alumnoSelected$.subscribe(x => {
      if (x !== null) {
        this.alumno = x;
        this.tipoPersona = this.alumno.tipoPersona;
        this.pathValues();
      }
    })

    this.personaSelected$.subscribe(x => {
      if (x) {
        this.tipoPersona = x?.tipoPersona!;
        console.log(this.tipoPersona)
      }
    })

    this.profesorSelected$.subscribe(x => {
      if (x !== null) {
        this.profesor = x;
        this.tipoPersona = this.profesor.tipoPersona;
        this.pathValues();
      }
    })
  }

  public onSubmit() {
    if (this.tipoPersona === TipoPersonaEnum.ALUMNO.toString()) {
      this.personaDto = new AlumnoDto();
      this.personaDto = this.form.value
      this.submitAlumno(this.personaDto);
    }
    else {
      this.personaDto = new ProfesorDto();
      this.personaDto = this.form.value;
      this.submitProfesor(this.personaDto);
    }
  }

  public submitAlumno(alumno: PersonaDto) {
    if (this.form.value._id === null) {
      this.store.dispatch(new PostAlumnoAction(alumno)).subscribe(() => {
        this.router.navigate(["/alumnos/lista"])
        this.messageService.add({ severity: 'success', summary: 'Crear alumno', detail: 'Se ha creado el alumno' });
      });

    }
    else {
      this.store.dispatch(new PutAlumnoAction(alumno)).subscribe(x => {
        this.router.navigate(["/alumnos/lista"])
        this.messageService.add({ severity: 'success', summary: 'Editar alumno', detail: 'Se guardaron los cambios del alumno' });
        this.store.dispatch(new ClearSelectedPersona);
      });
    }
  }

  public submitProfesor(profesor: PersonaDto) {
    if (this.form.value._id === null) {
      this.store.dispatch(new PostProfesorAction(this.personaDto)).subscribe(() => {
        this.router.navigate(["/profesores/lista"])
        this.messageService.add({ severity: 'success', summary: 'Crear profesor', detail: 'Se ha creado el profesor' });
      });
    }
    else {
      this.store.dispatch(new PutProfesorAction(profesor)).subscribe(x => this.router.navigate(["/profesores/lista"]));
      this.messageService.add({ severity: 'success', summary: 'Editar profesor', detail: 'Se guardaron los cambios del profesor' });
      this.store.dispatch(new ClearSelectedPersona);
    }

  }

  public redirectPersona() {
    if (this.tipoPersona === TipoPersonaEnum.ALUMNO.toString()) {
      this.router.navigate(["/alumnos/lista"])
    }
    else {
      this.router.navigate(["/profesores/lista"])
    }
    this.store.dispatch(new ClearSelectedPersona);
    this.store.dispatch(new ClearSelectedPlanInModal);
  }

  toggleModalPlanes() {
    this.store.dispatch(new ShowPlanModal(true));
  }

  pathValues() {
    if (this.tipoPersona === TipoPersonaEnum.ALUMNO.toString()) {
      this.form.patchValue(this.alumno);
      console.log(this.alumno);
      this.form.patchValue({ 'fechaNacimiento': this.datePipe.transform(this.alumno.fechaNacimiento, 'dd/MM/yyyy') })
      this.form.patchValue({ 'planDescription': this.alumno.plan.descripcion, 'plan': this.alumno.plan._id });
    }
    else {
      this.form.patchValue(this.profesor);
      this.form.patchValue({ 'fechaNacimiento': this.datePipe.transform(this.profesor.fechaNacimiento, 'dd/MM/yyyy') })
      this.form.patchValue({ 'planDescription': this.profesor.plan.descripcion, 'plan': this.profesor.plan._id });
    }
  }

}
