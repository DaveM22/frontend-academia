import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Curso } from '../../entities/curso';
import { CursoState } from '../../store/states/api/curso.state';
import { ActivatedRoute, Router } from '@angular/router';
import { CursoFilter } from '../../entities/filter';
import { GetCursoAction } from '../../store/actions/api/curso.action';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { MessagesModule } from 'primeng/messages';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-materia-cursos',
  standalone: true,
  imports: [CommonModule, TableModule, ButtonModule, IconFieldModule, InputIconModule, MessagesModule, InputTextModule],
  templateUrl: './materia-cursos.component.html',
  styleUrl: './materia-cursos.component.scss'
})
export class MateriaCursosComponent implements OnInit {
  cursos$:Observable<Curso[]> = this.store.select(CursoState.getCursos); 
  materiaId:string = ''
  loading$:Observable<boolean> = this.store.select(CursoState.getLoading);
  constructor(private store:Store, private activateRouter:ActivatedRoute, private route:Router){}


  ngOnInit(): void {
    this.materiaId = this.activateRouter.snapshot.params['id'];
    let filter = new CursoFilter();
    filter.materiaId = this.materiaId;
    this.store.dispatch(new GetCursoAction(filter));
  }

  redirectDocentesCursos(id:string){
    this.route.navigate([`asignacion-docentes/${this.materiaId}/${id}/docentes`]);
  }

  redirectSeleccionarMateria(){
    this.route.navigate(["/asignacion-docentes/seleccionar-materia"])
  }

}
