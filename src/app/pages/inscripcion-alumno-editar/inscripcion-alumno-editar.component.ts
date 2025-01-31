import { Component } from '@angular/core';
import { InscripcionFormComponent } from '../../components/forms/inscripcion-form/inscripcion-form.component';
import { CommonModule } from '@angular/common';
import { AlumnoInscripcion } from '../../entities/alumno-inscripcion';
import { Observable } from 'rxjs';
import { AlumnoInscripcionPageState } from '../../store/states/page/alumno-inscripcion.state';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngxs/store';
import { GetOneAlumnoInscripcionAction } from '../../store/actions/api/alumno-inscripcion.action';

@Component({
  selector: 'app-inscripcion-alumno-editar',
  standalone: true,
  imports: [InscripcionFormComponent, CommonModule],
  templateUrl: './inscripcion-alumno-editar.component.html',
  styleUrl: './inscripcion-alumno-editar.component.scss'
})
export class InscripcionAlumnoEditarComponent {
  alumnoInscripcion$:Observable<AlumnoInscripcion | null> = this.store.select(AlumnoInscripcionPageState.getAlumnoInscripcionSelected);

  constructor(private store:Store, private router:ActivatedRoute){
    
  }


  ngOnInit(): void {
    this.store.dispatch(new GetOneAlumnoInscripcionAction(this.router.snapshot.params['idInscripcion']));
  }
}
