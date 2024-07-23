import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { MessagesModule } from 'primeng/messages';
import { PanelModule } from 'primeng/panel';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { Observable } from 'rxjs';
import { Curso } from '../../entities/curso';
import { CursoState } from '../../store/states/api/curso.state';
import { Store } from '@ngxs/store';
import { Router, RouterModule } from '@angular/router';
import { GetCursoAction } from '../../store/actions/api/curso.action';
import { CursoFilter } from '../../entities/filter';

@Component({
  selector: 'app-curso',
  standalone: true,
  imports: [CommonModule, PanelModule, RouterModule],
  templateUrl: './curso.component.html',
  styleUrl: './curso.component.scss'
})
export class CursoComponent {
  public cursos$: Observable<Curso[]> = this.store.select(CursoState.getCursos)

  public loading$:Observable<boolean> = this.store.select(CursoState.getLoading);

  public error$:Observable<boolean> = this.store.select(CursoState.getError);

  public errorMessage$:Observable<string> = this.store.select(CursoState.getErrorMessage);
  curso!: Curso;

  constructor(private store:Store, private router:Router){

  }

  ngOnInit(): void {
    const filters = new CursoFilter();
    filters.mostrarComision = true;
    filters.mostrarMateria = true;
    this.store.dispatch(new GetCursoAction(filters));
  }


/*   showModal(curso:Curso){
    this.curso = curso;
    this.store.dispatch(new ShowModalDelete(true));
  } */

  redirectNewCurso(){
    this.router.navigate(["/cursos/nuevo"]);
  }

  redirectEditCurso(id:string){
    this.router.navigate(["/cursos/editar/" + id])
  }

  cursos!: Curso[];
  title = 'academia';
}
