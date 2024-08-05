import { Component, Input } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';
import { Especialidad } from '../../../entities/especialidad';
import { PostEspecialidadAction, PutEspecialidadAction } from '../../../store/actions/api/especialidad.action';
import { ClearSelectedEspecialidad } from '../../../store/actions/pages/especialidad.action';
import { EspecialidadPageState } from '../../../store/states/page/especialidad.state';
import { UsuarioPageState } from '../../../store/states/page/usuario.state';
import { Usuario } from '../../../entities/usuario';
import { PasswordModule } from 'primeng/password';

@Component({
  selector: 'app-usuario-form',
  standalone: true,
  imports: [ReactiveFormsModule, InputTextModule, CardModule, ButtonModule,ToastModule,  RippleModule, PasswordModule],
  templateUrl: './usuario-form.component.html',
  styleUrl: './usuario-form.component.scss'
})
export class UsuarioFormComponent {
  form!: FormGroup;
  @Input() usuario!:Usuario;
  @Input() title!:string;

  constructor(private store:Store, private router:Router, private messageService:MessageService){}

  ngOnInit(): void {
    this.form = new FormGroup({
      _id: new FormControl(null),
      nombreUsuario: new FormControl('', [Validators.required]),
      nombreYapellido: new FormControl('', [Validators.required]),
      clave: new FormControl('',[Validators.required])
    });
    this.form.patchValue(this.store.selectSnapshot(UsuarioPageState.getUsuarioSelected)!);
  }

  public onSubmit(){
/*     this.especialidad = this.form.value
    if(this.form.value._id === null){
      this.store.dispatch(new PostEspecialidadAction(this.especialidad)).subscribe(() => {
        this.router.navigate(["/especialidades/lista"])

      });

    }
    else{
      this.store.dispatch(new PutEspecialidadAction(this.especialidad)).subscribe(x => this.router.navigate(["/especialidades"]));
      this.messageService.add({ severity: 'success', summary: 'Editar especialidad', detail: 'Se guardaron los cambios de la especialidad' });
      
      this.store.dispatch(new ClearSelectedEspecialidad);

    }
    this.form.reset(); */

  }

  public redirectEspecialidades(){
    this.store.dispatch(new ClearSelectedEspecialidad);
    this.router.navigate(["/usuarios/lista"]);
  }
}
