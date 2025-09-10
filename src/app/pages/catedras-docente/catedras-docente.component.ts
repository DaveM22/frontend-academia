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
import { Alumno } from '../../entities/alumno';
import { AlumnoInscripcion } from '../../entities/alumno-inscripcion';
import { AlumnoFilter, DocenteFilter } from '../../entities/filter';
import { GetAlumnoByIdAction, GetProfesorByIdAction } from '../../store/actions/api/persona.action';
import { AppPageState } from '../../store/states/page/app.state';
import { PersonaPageState } from '../../store/states/page/persona.state';
import { Profesor } from '../../entities/profesor';
import { DocenteCurso } from '../../entities/docente-curso';
import { RouterModule } from '@angular/router';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-catedras-docente',
  standalone: true,
  imports: [CommonModule, RouterModule, CardModule],
  templateUrl: './catedras-docente.component.html',
  styleUrl: './catedras-docente.component.scss'
})
export class CatedrasDocenteComponent {
 

}
