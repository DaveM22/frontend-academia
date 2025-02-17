import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CursoFormComponent } from '../../components/forms/curso-form/curso-form.component';
import { Observable } from 'rxjs';
import { Curso } from '../../entities/curso';
import { Store } from '@ngxs/store';
import { CursoPageState } from '../../store/states/page/curso.state';
import { GetByIdCursoAction } from '../../store/actions/api/curso.action';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-curso-editar',
  standalone: true,
  imports: [CursoFormComponent, CommonModule],
  templateUrl: './curso-editar.component.html',
  styleUrl: './curso-editar.component.scss'
})
export class CursoEditarComponent {

constructor(private store:Store, private router:ActivatedRoute){}


  curso$:Observable<Curso | null> = this.store.select(CursoPageState.getCursoSelected);

}
