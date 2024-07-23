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
import { ToastModule } from 'primeng/toast';
import { RippleModule } from 'primeng/ripple';
import { InputMaskModule } from 'primeng/inputmask';
import { PlanesModalComponent } from '../../modals/planes-modal/planes-modal.component';
import { ShowPlanModal } from '../../../store/actions/pages/app.action';
import { Observable } from 'rxjs';
import { PlanState } from '../../../store/states/api/plan.state';
import { AppPageState } from '../../../store/states/page/app.state';
import { Plan } from '../../../entities/plan';
import { TipoPersonaEnum } from '../../../util/EnumTipoPersona';
import { ClearSelectedPersona } from '../../../store/actions/pages/persona.action';
import { ProfesorDto } from '../../../entities/profesor';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-persona-form',
  standalone: true,
  imports: [ReactiveFormsModule, InputTextModule, CardModule, ButtonModule, ToastModule, RippleModule, InputMaskModule, PlanesModalComponent],
  templateUrl: './persona-form.component.html',
  styleUrl: './persona-form.component.scss',
  providers:[DatePipe]
})
export class PersonaFormComponent {
  @Input() title!: string;
  tipoPersona!: TipoPersonaEnum
  planSelected$: Observable<Plan | null> = this.store.select(AppPageState.getSelectedPlanInModal);
  personaSelected$:Observable<Persona | null> = this.store.select(PersonaPageState.getPersonaSelected);
  form!: FormGroup;
  persona!: Persona;
  personaDto!: PersonaDto;

  constructor(private store: Store, private router: Router, private messageService: MessageService, private datePipe:DatePipe) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      _id: new FormControl(null),
      nombre: new FormControl('', [Validators.required]),
      apellido: new FormControl('', [Validators.required]),
      direccion: new FormControl('', [Validators.required]),
      email: new FormControl(''),
      telefono: new FormControl(''),
      fechaNacimiento: new FormControl('', [Validators.required]),
      plan: new FormControl('', [Validators.required]),
      planId: new FormControl('', [Validators.required])

    });

    this.planSelected$.subscribe(x => {
      if (x !== null) {
        this.form.patchValue({ 'plan': x.descripcion, 'planId': x._id });
      }
    })
    this.personaSelected$.subscribe(x => {
      if(x !== null){
        this.persona = x;
        this.pathValues();
      }
    })
  }

  public onSubmit() {
    if (this.tipoPersona === TipoPersonaEnum.ALUMNO) {
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
        this.router.navigate(["/personas/alumnos"])
      });
    }
    else {
      this.store.dispatch(new PutAlumnoAction(alumno)).subscribe(x => this.router.navigate(["/personas/alumnos"]));
      this.messageService.add({ severity: 'success', summary: 'Editar alumno', detail: 'Se guardaron los cambios del alumno' });
      this.store.dispatch(new ClearSelectedPersona);
    }
    this.form.reset();
  }

  public submitProfesor(profesor: PersonaDto) {
    if (this.form.value._id === null) {
      this.store.dispatch(new PostProfesorAction(this.personaDto)).subscribe(() => {
        this.router.navigate(["/personas/profesores"])
      });
    }
    else {
      this.store.dispatch(new PutProfesorAction(profesor)).subscribe(x => this.router.navigate(["/personas/profesores"]));
      this.messageService.add({ severity: 'success', summary: 'Editar especialidad', detail: 'Se guardaron los cambios del profesor' });
      this.store.dispatch(new ClearSelectedPersona);
    }
    this.form.reset();
  }

  public redirectPersona() {
    this.store.dispatch(new ClearSelectedPersona);
    console.log(this.tipoPersona);
    if (this.tipoPersona === TipoPersonaEnum.ALUMNO) {
      this.router.navigate(["/personas/alumnos/lista"])
    }
    else {
      this.router.navigate(["/personas/profesores/lista"])
    }

  }

  toggleModalPlanes() {
    this.store.dispatch(new ShowPlanModal(true));
  }

  pathValues() {
    this.tipoPersona = this.persona.tipoPersona;
    if (this.persona._id !== "") {
      this.form.patchValue(this.persona);
      this.form.patchValue({'fechaNacimiento':this.datePipe.transform(this.persona.fechaNacimiento, 'dd/MM/yyyy')})
      this.form.patchValue({ 'plan': this.persona.plan.descripcion, 'planId': this.persona.plan._id });
    }
  }

}
