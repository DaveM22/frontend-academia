import { Component } from '@angular/core';
import { InscripcionFormComponent } from '../../components/forms/inscripcion-form/inscripcion-form.component';

@Component({
  selector: 'app-inscripcion-nuevo',
  standalone: true,
  imports: [InscripcionFormComponent],
  templateUrl: './inscripcion-nuevo.component.html',
  styleUrl: './inscripcion-nuevo.component.scss'
})
export class InscripcionNuevoComponent {

}
