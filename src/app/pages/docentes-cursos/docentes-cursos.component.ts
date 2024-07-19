import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { MessagesModule } from 'primeng/messages';
import { TableModule } from 'primeng/table';
import { Observable } from 'rxjs';
import { Curso } from '../../entities/curso';
import { Store } from '@ngxs/store';
import { DocenteCursoState } from '../../store/states/api/docente-curso.state';
import { DocenteCurso } from '../../entities/docente-curso';
import { ActivatedRoute, Router } from '@angular/router';
import { GetDocenteCursoAction } from '../../store/actions/api/docente-curso.action';
import { DocenteCursoFilter } from '../../entities/filter';
import { CursoState } from '../../store/states/api/curso.state';
import { CursoPageState } from '../../store/states/page/curso.state';
import { GetByIdCursoAction } from '../../store/actions/api/curso.action';

@Component({
  selector: 'app-docentes-cursos',
  standalone: true,
  imports: [CommonModule, TableModule, ButtonModule, IconFieldModule, InputIconModule, MessagesModule, InputTextModule],
  templateUrl: './docentes-cursos.component.html',
  styleUrl: './docentes-cursos.component.scss'
})
export class DocentesCursosComponent implements OnInit {
  docenteCursos$: Observable<DocenteCurso[]> = this.store.select(DocenteCursoState.getDocentesCursos);
  curso$:Observable<Curso | null> = this.store.select(CursoPageState.getCursoSelected);
  materiaId:string='';
  cursoId:string='';
  curso!:Curso;
  constructor(private store:Store, private activateRoute:ActivatedRoute, private router:Router){}

  ngOnInit(): void {  
    this.curso$.subscribe(x => {
      if(x!== null){
        this.curso = x;
      }
    })

    this.materiaId = this.activateRoute.snapshot.params['idMateria'];
    this.cursoId = this.activateRoute.snapshot.params['idCurso'];
    let filter = new DocenteCursoFilter();
    filter.cursoId = this.cursoId
    this.store.dispatch(new GetByIdCursoAction(this.cursoId));
    this.store.dispatch(new GetDocenteCursoAction(filter));
  }

  redirectNewDocenteCurso(){
    this.router.navigate([`asignacion-docentes/${this.materiaId}/${this.cursoId}/docentes/nuevo`])
  }


}
