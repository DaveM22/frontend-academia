import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { MessagesModule } from 'primeng/messages';
import { TableModule } from 'primeng/table';
import { PersonaPageState } from '../../store/states/page/persona.state';
import { Alumno } from '../../entities/alumno';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Persona } from '../../entities/persona';
import { PersonaState } from '../../store/states/api/persona.state';
import { AlumnoInscripcion } from '../../entities/alumno-inscripcion';
import { GetAlumnoByIdAction, GetAlumnoByIdWithInscripcionesAction } from '../../store/actions/api/persona.action';
import { ActivatedRoute, Router } from '@angular/router';
import { AlumnoFilter } from '../../entities/filter';

@Component({
  selector: 'app-inscripciones',
  standalone: true,
  imports: [CommonModule, TableModule, ButtonModule, IconFieldModule, InputIconModule, MessagesModule, InputTextModule],
  templateUrl: './inscripciones.component.html',
  styleUrl: './inscripciones.component.scss'
})
export class InscripcionesComponent implements OnInit  {
  alumno$:Observable<Alumno | null> = this.store.select(PersonaPageState.getAlumnoSelected);
  loading$:Observable<boolean> = this.store.select(PersonaState.getLoading);
  alumno!:Alumno;
  inscripciones:AlumnoInscripcion[]=[]
  constructor(private store:Store,private route:Router, private router:ActivatedRoute){}

  
  ngOnInit(): void {
    let filter = new AlumnoFilter();
    filter.incluirInscripciones = true;
    this.store.dispatch(new GetAlumnoByIdAction(this.router.snapshot.params['id'], filter));

    this.alumno$.subscribe(x => {

      if(x !== null){
        this.alumno = x;
        this.inscripciones = this.alumno.inscripciones;
      }
    })

    
  }

  redirectToNuevaInscripcion(){
    this.route.navigate([`inscripciones/alumnos/${this.alumno._id}/nuevo`]);
  }

  redirectToInscripcionesalumnos(){
    this.route.navigate([`inscripciones/alumnos/lista`]);
  }

  redirectActualizarInscripcion(inscripcionId:string){

  }

  

}
