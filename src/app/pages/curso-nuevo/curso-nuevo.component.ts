import { Component } from '@angular/core';
import { CursoFormComponent } from '../../components/forms/curso-form/curso-form.component';
import { Store } from '@ngxs/store';
import { AsignSelectedCursoAction } from '../../store/actions/pages/curso.action';
import { Curso } from '../../entities/curso';

@Component({
  selector: 'app-curso-nuevo',
  standalone: true,
  imports: [CursoFormComponent],
  templateUrl: './curso-nuevo.component.html',
  styleUrl: './curso-nuevo.component.scss'
})
export class CursoNuevoComponent {


}
