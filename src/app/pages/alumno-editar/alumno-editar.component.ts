import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Alumno } from '../../entities/alumno';
import { PersonaState } from '../../store/states/api/persona.state';
import { PersonaPageState } from '../../store/states/page/persona.state';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngxs/store';
import { GetAlumnoByIdAction } from '../../store/actions/api/persona.action';
import { PersonaFormComponent } from '../../components/forms/persona-form/persona-form.component';
import { CommonModule } from '@angular/common';
import { AlumnoFilter } from '../../entities/filter';
import { Persona } from '../../entities/persona';

@Component({
  selector: 'app-alumno-editar',
  standalone: true,
  imports: [PersonaFormComponent, CommonModule],
  templateUrl: './alumno-editar.component.html',
  styleUrl: './alumno-editar.component.scss'
})
export class AlumnoEditarComponent {
  alumno$:Observable<Persona | null> = this.store.select(PersonaPageState.getAlumnoSelected);

  constructor(private store:Store){}


  
}
