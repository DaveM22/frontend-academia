import { Component, OnInit } from '@angular/core';
import { PersonaFormComponent } from '../../components/forms/persona-form/persona-form.component';
import { Store } from '@ngxs/store';
import { AsignSelectedPersona } from '../../store/actions/pages/persona.action';
import { Alumno } from '../../entities/alumno';

@Component({
  selector: 'app-alumno-nuevo',
  standalone: true,
  imports: [PersonaFormComponent],
  templateUrl: './alumno-nuevo.component.html',
  styleUrl: './alumno-nuevo.component.scss'
})
export class AlumnoNuevoComponent implements OnInit {

  constructor(private store:Store){

  }

  ngOnInit(): void {
    this.store.dispatch(new AsignSelectedPersona(new Alumno()));
  }

  

  
}
