import { Component, Input, OnDestroy } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { RippleModule } from 'primeng/ripple';
import { Especialidad } from '../../../entities/especialidad';
import { PostEspecialidadAction, PutEspecialidadAction } from '../../../store/actions/api/especialidad.action';
import { ClearSelectedEspecialidad } from '../../../store/actions/pages/especialidad.action';
import { EspecialidadPageState } from '../../../store/states/page/especialidad.state';
import { UsuarioPageState } from '../../../store/states/page/usuario.state';
import { Usuario } from '../../../entities/usuario';
import { PasswordModule } from 'primeng/password';
import { SelectModule } from 'primeng/select';
import { PostUsuarioAction, PutUsuarioAction } from '../../../store/actions/api/usuarios.action';
import { Persona } from '../../../entities/persona';
import { PersonaPageState } from '../../../store/states/page/persona.state';
import { Observable } from 'rxjs';
import { ShowPersonaModal } from '../../../store/actions/pages/app.action';
import { PersonasModalComponent } from "../../modals/personas-modal/personas-modal.component";
import { AppPageState } from '../../../store/states/page/app.state';
import { CommonModule } from '@angular/common';
import { ClearSelectedUsuario } from '../../../store/actions/pages/usuario.action';

@Component({
  selector: 'app-usuario-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, InputTextModule, CardModule, ButtonModule, PersonasModalComponent, RippleModule, PasswordModule, SelectModule, PersonasModalComponent],
  templateUrl: './usuario-form.component.html',
  styleUrl: './usuario-form.component.scss'
})
export class UsuarioFormComponent implements OnDestroy {
  personaSelected$: Observable<Persona | null> = this.store.select(AppPageState.getSelectedPersonaInModal)
  modalPersonas$: Observable<boolean> = this.store.select(AppPageState.getShowModalPersonas);
  usuario$: Observable<Usuario | null> = this.store.select(UsuarioPageState.getUsuarioSelected);
  form!: FormGroup;
  usuario!: Usuario;
  @Input() title!: string;
  roles: object[] | undefined;
  personaSelected!: Persona;
  constructor(private store: Store, private router: Router, private messageService: MessageService) { }
  ngOnDestroy(): void {
    this.store.dispatch(new ClearSelectedUsuario());
  }

  compareFn(r1: any, r2: any): boolean {
    return r1 && r2 ? r1.name === r2.name : r1 === r2;
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      _id: new FormControl(null),
      email: new FormControl('', [Validators.required]),
      nombreUsuario: new FormControl('', [Validators.required]),
      nombreYapellido: new FormControl('', [Validators.required]),
      clave: new FormControl('', [Validators.required]),
      role: new FormControl({ value: '', disabled: false }, [Validators.required]),
      personaDescripcion: new FormControl('', [Validators.required]),
      persona: new FormControl('', [Validators.required])
    });

    this.roles = [
      { name: 'Docente', code: 'rol_7dAr6i1DwSZLKsrh' },
      { name: 'Alumno', code: 'rol_QNzSR8heCdXENPon' }
    ];

    this.usuario$.subscribe(x => {
      if (x) {
        this.usuario = x!;

        if (this.usuario) {
          const rolEncontrado = (this.roles as any[]).find(r => r.name === this.usuario.role);
          this.form.patchValue(this.usuario);

          const personaDescripcion = this.usuario.persona
            ? `Legajo: ${this.usuario.persona.legajo} - ${this.usuario.persona.nombre} ${this.usuario.persona.apellido}`
            : '';

          this.form.patchValue({
            personaDescripcion: personaDescripcion,
            persona: this.usuario.persona ? this.usuario.persona._id : '',
            role: rolEncontrado
          });

          this.form.get('role')?.disable();
        }
      }
    });

    this.personaSelected$.subscribe(x => {
      if (x !== null) {
        this.personaSelected = x!;
        this.form.patchValue({ 'personaDescripcion': this.personaSelected.legajo, 'persona': this.personaSelected._id });
      }
    })

  }


  pathValues() {
    let persona = this.store.selectSnapshot(PersonaPageState.getPersonaSelected);
    if (persona?._id !== "") {
      this.form.patchValue(persona!);
      this.form.patchValue({ 'plan': persona!.plan.descripcion, 'planId': persona!.plan._id });
      this.form.patchValue({ 'personaId': persona!._id, 'personaDescripcion': persona!.legajo });
    }
  }

  public onSubmit() {
    const formValue = this.form.getRawValue(); // getRawValue para incluir controles deshabilitados
    this.usuario = { ...formValue };
    this.usuario.role = formValue.role.code;

    if (this.usuario._id === null) {
      this.store.dispatch(new PostUsuarioAction(this.usuario)).subscribe(() => {
        this.messageService.add({ severity: 'success', detail: 'Se ha creado el usuario correctamente' });
        this.router.navigate(["/usuarios/lista"])
      })
    }
    else {
      this.store.dispatch(new PutUsuarioAction(this.usuario)).subscribe(() => {
        this.messageService.add({ severity: 'success', detail: 'Se guardaron los cambios del usuario' });
        this.store.dispatch(new ClearSelectedUsuario());
        this.router.navigate(["/usuarios/lista"])
      })
    }
  }

  subscripcionUsuarioSelected() {
    this.personaSelected$.subscribe(x => {
      if (x !== null) {
        this.personaSelected = x!;
        this.form.patchValue({ 'persona': this.personaSelected.legajo, 'personaId': this.personaSelected._id });
      }
    })
  }


  toggleModalPersonas() {
    this.store.dispatch(new ShowPersonaModal(true));
  }

  public redirectUsuarios() {
    this.store.dispatch(new ClearSelectedEspecialidad);
    this.router.navigate(["/usuarios/lista"]);
  }
}
