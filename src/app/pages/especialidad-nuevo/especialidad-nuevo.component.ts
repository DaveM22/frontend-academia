import { Component } from '@angular/core';
import { EspecialidadFormComponent } from '../../components/forms/especialidad-form/especialidad-form.component';
import { Especialidad } from '../../entities/especialidad';

@Component({
  selector: 'app-especialidad-nuevo',
  standalone: true,
  imports: [EspecialidadFormComponent],
  templateUrl: './especialidad-nuevo.component.html',
  styleUrl: './especialidad-nuevo.component.scss'
})
export class EspecialidadNuevoComponent {

}
