import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { MessagesModule } from 'primeng/messages';
import { TableModule } from 'primeng/table';
import { ToolbarModule } from 'primeng/toolbar';
import { EspecialidadFilterComponent } from '../../components/filters/especialidad-filter/especialidad-filter.component';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Alumno } from '../../entities/alumno';
import { AlumnoInscripcion } from '../../entities/alumno-inscripcion';
import { AlumnoFilter, MateriaFilter } from '../../entities/filter';
import { GetAlumnoByIdAction } from '../../store/actions/api/persona.action';
import { AppPageState } from '../../store/states/page/app.state';
import { PersonaPageState } from '../../store/states/page/persona.state';
import { GetByIdForInscripcion } from '../../store/actions/api/materia.action';
import { MateriaState } from '../../store/states/api/materia.state';
import { Materia } from '../../entities/materia';
import { RouterModule } from '@angular/router';
import { PanelModule } from 'primeng/panel';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-inscripcion-materia-alumno',
  standalone: true,
  imports: [CommonModule,RouterModule, PanelModule, CardModule],
  templateUrl: './inscripcion-materia-alumno.component.html',
  styleUrl: './inscripcion-materia-alumno.component.scss'
})
export class InscripcionMateriaAlumnoComponent {

}
