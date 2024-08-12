import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Profesor } from '../../entities/profesor';
import { PersonaPageState } from '../../store/states/page/persona.state';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngxs/store';
import { GetProfesorByIdAction } from '../../store/actions/api/persona.action';
import { CommonModule } from '@angular/common';
import { PersonaFormComponent } from '../../components/forms/persona-form/persona-form.component';
import { DocenteFilter } from '../../entities/filter';

@Component({
  selector: 'app-profesor-editar',
  standalone: true,
  imports: [CommonModule, PersonaFormComponent],
  templateUrl: './profesor-editar.component.html',
  styleUrl: './profesor-editar.component.scss'
})
export class ProfesorEditarComponent {
  profesor$:Observable<Profesor | null> = this.store.select(PersonaPageState.getProfesorSelected);

  constructor(private store:Store, private router:ActivatedRoute){
    
  }


  ngOnInit(): void {
    this.store.dispatch(new GetProfesorByIdAction(this.router.snapshot.params['id'], new DocenteFilter()));
  }
}
