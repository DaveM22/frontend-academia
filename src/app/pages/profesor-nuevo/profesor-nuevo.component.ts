import { Component } from '@angular/core';
import { PersonaFormComponent } from '../../components/forms/persona-form/persona-form.component';
import { Store } from '@ngxs/store';
import { AsignSelectedPersona } from '../../store/actions/pages/persona.action';
import { Profesor } from '../../entities/profesor';

@Component({
  selector: 'app-profesor-nuevo',
  standalone: true,
  imports: [PersonaFormComponent],
  templateUrl: './profesor-nuevo.component.html',
  styleUrl: './profesor-nuevo.component.scss'
})
export class ProfesorNuevoComponent {

  constructor(private store:Store){

  }

  ngOnInit(): void {
    this.store.dispatch(new AsignSelectedPersona(new Profesor()));
  }

}
