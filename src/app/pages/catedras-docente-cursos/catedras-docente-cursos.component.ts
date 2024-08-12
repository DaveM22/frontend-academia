import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Store } from '@ngxs/store';
import { ButtonModule } from 'primeng/button';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { MessagesModule } from 'primeng/messages';
import { PanelModule } from 'primeng/panel';
import { TableModule } from 'primeng/table';
import { ToolbarModule } from 'primeng/toolbar';
import { Observable } from 'rxjs';
import { DocenteCurso } from '../../entities/docente-curso';
import { DocenteFilter } from '../../entities/filter';
import { Profesor } from '../../entities/profesor';
import { GetProfesorByIdAction } from '../../store/actions/api/persona.action';
import { AppPageState } from '../../store/states/page/app.state';
import { PersonaPageState } from '../../store/states/page/persona.state';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-catedras-docente-cursos',
  standalone: true,
  imports: [CommonModule,ToolbarModule,PanelModule, TableModule, ButtonModule, IconFieldModule, InputIconModule, MessagesModule, InputTextModule],
  templateUrl: './catedras-docente-cursos.component.html',
  styleUrl: './catedras-docente-cursos.component.scss'
})
export class CatedrasDocenteCursosComponent {
  persona$:Observable<Profesor | null> = this.store.select(PersonaPageState.getProfesorSelected);
  personaid$:Observable<string> = this.store.select(AppPageState.getPersonId);
  persona!:Profesor;
  cursos:DocenteCurso[] = [];
  constructor(private store:Store, private route:Router){}

  ngOnInit(): void {
    this.personaid$.subscribe(x => {
      if(x !== ''){
        let personId = x;
        let filters = new DocenteFilter();
        filters.incluirAsignaciones = true;
    
         this.store.dispatch(new GetProfesorByIdAction(personId,filters))
      }
    })

    this.persona$.subscribe(x => {
      if(x !== null){
        this.persona = x;
        this.cursos = this.persona.cursos_asignados;
      }
    })

  }

  redirectToCatedrasDocenteInscripciones(idCurso:string){
    this.route.navigate([`docente/${this.persona._id}/cursos-inscripciones/${idCurso}`]);
  }


}
