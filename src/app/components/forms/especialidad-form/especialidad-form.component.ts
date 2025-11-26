import { ChangeDetectorRef, Component, Input, OnInit, Type } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { Store } from '@ngxs/store';
import { Router } from '@angular/router';
import { Especialidad, IEspecialidad } from '../../../entities/especialidad';
import { PostEspecialidadAction, PutEspecialidadAction } from '../../../store/actions/api/especialidad.action';
import { EspecialidadState } from '../../../store/states/api/especialidad.state';
import { EspecialidadPageState } from '../../../store/states/page/especialidad.state';
import { ClearSelectedEspecialidad } from '../../../store/actions/pages/especialidad.action';
import { MessageService } from 'primeng/api';
import { RippleModule } from 'primeng/ripple';
import { BlockUI } from 'primeng/blockui';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ProgressSpinner } from 'primeng/progressspinner';
import { PanelModule } from 'primeng/panel';
@Component({
  selector: 'app-especialidad-form',
  standalone: true,
  imports: [CommonModule, PanelModule, ReactiveFormsModule, InputTextModule, CardModule, ButtonModule, RippleModule],
  templateUrl: './especialidad-form.component.html',
  styleUrl: './especialidad-form.component.scss'
})
export class EspecialidadFormComponent implements OnInit {
  form!: FormGroup;
  @Input() especialidad!: Especialidad;
  @Input() title!: string;

  constructor(private store: Store, private router: Router, private messageService: MessageService) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      _id: new FormControl(null),
      descripcion: new FormControl('', [Validators.required])
    });
    const especialidad = this.store.selectSnapshot(EspecialidadPageState.getEspecialidadSelected);
    if (especialidad) {
      this.form.patchValue(especialidad);
    }
  }

  public onSubmit() {
    this.especialidad = this.form.value
    if (this.form.value._id === null) {
      this.store.dispatch(new PostEspecialidadAction(this.especialidad)).subscribe(() => {
        this.router.navigate(["/especialidades/lista"])
        this.messageService.add({ severity: 'success', summary: 'Editar especialidad', detail: 'Se ha creado la especialidad' });
      });

    }
    else {
      this.store.dispatch(new PutEspecialidadAction(this.especialidad)).subscribe(() => {
        this.router.navigate(["/especialidades/lista"])
        this.messageService.add({ severity: 'success', summary: 'Editar especialidad', detail: 'Se guardaron los cambios de la especialidad' });

        this.store.dispatch(new ClearSelectedEspecialidad);
        this.router.navigate(["/especialidades/lista"])
      });
    }
    this.form.reset();

  }

  public redirectEspecialidades() {
    this.store.dispatch(new ClearSelectedEspecialidad);
    this.router.navigate(["/especialidades/lista"]);
  }

}
