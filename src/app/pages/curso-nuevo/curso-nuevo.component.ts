import { Component } from '@angular/core';
import { CursoFormComponent } from '../../components/forms/curso-form/curso-form.component';


@Component({
  selector: 'app-curso-nuevo',
  standalone: true,
  imports: [CursoFormComponent],
  templateUrl: './curso-nuevo.component.html',
  styleUrl: './curso-nuevo.component.scss'
})
export class CursoNuevoComponent {


}
