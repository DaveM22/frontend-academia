import { Component, OnInit } from '@angular/core';
import { DocenteCursoFormComponent } from '../../components/forms/docente-curso-form/docente-curso-form.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-docentes-cursos-nuevo',
  standalone: true,
  imports: [DocenteCursoFormComponent],
  templateUrl: './docentes-cursos-nuevo.component.html',
  styleUrl: './docentes-cursos-nuevo.component.scss'
})
export class DocentesCursosNuevoComponent implements OnInit {
  cursoId:string=''

  constructor(private activateRoute:ActivatedRoute){}


  ngOnInit(): void {
    this.cursoId = this.activateRoute.snapshot.params['idCurso'];
  }
}
