import { Component, Input } from '@angular/core';
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

@Component({
  selector: 'app-usuario-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, InputTextModule, CardModule, ButtonModule, PersonasModalComponent, RippleModule, PasswordModule, SelectModule, PersonasModalComponent],
  templateUrl: './usuario-form.component.html',
  styleUrl: './usuario-form.component.scss'
})
export class UsuarioFormComponent {
  personaSelected$: Observable<Persona | null> = this.store.select(AppPageState.getSelectedPersonaInModal)
  modalPersonas$: Observable<boolean> = this.store.select(AppPageState.getShowModalPersonas);
  form!: FormGroup;
  @Input() usuario!: Usuario;
  @Input() title!: string;
  roles: object[] | undefined;
  personaSelected!: Persona;
  constructor(private store: Store, private router: Router, private messageService: MessageService) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      _id: new FormControl(null),
      email: new FormControl('', [Validators.required]),
      nombreUsuario: new FormControl('', [Validators.required]),
      nombreYapellido: new FormControl('', [Validators.required]),
      clave: new FormControl('', [Validators.required]),
      role: new FormControl('', [Validators.required]),
      personaDescripcion: new FormControl('', [Validators.required]),
      persona: new FormControl('', [Validators.required])
    });
    const usuario = this.store.selectSnapshot(UsuarioPageState.getUsuarioSelected);
    if (usuario) {
      this.form.patchValue(usuario);
    }

    this.roles = [
      { name: 'Docente', code: 'rol_7dAr6i1DwSZLKsrh' },
      { name: 'Alumnno', code: 'rol_QNzSR8heCdXENPon' }
    ];

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
      this.form.patchValue({'personaId': persona!._id, 'personaDescripcion': persona!.legajo });
    }
  }

  public onSubmit() {
    this.usuario = this.form.value;
    if (this.form.value._id === null) {
      this.store.dispatch(new PostUsuarioAction(this.usuario)).subscribe(() => {
        this.router.navigate(["/usuarios/lista"])
      })
    }
    else{
      if (this.form.value._id !== null) {
        this.store.dispatch(new PutUsuarioAction(this.usuario)).subscribe(() => {
          this.router.navigate(["/usuarios/lista"])
        })
      }
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
