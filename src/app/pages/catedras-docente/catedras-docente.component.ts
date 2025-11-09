import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { ButtonModule } from 'primeng/button';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { MessagesModule } from 'primeng/messages';
import { PanelModule } from 'primeng/panel';
import { TableModule } from 'primeng/table';
import { ToolbarModule } from 'primeng/toolbar';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { Observable, firstValueFrom } from 'rxjs';
import { filter } from 'rxjs/operators';
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
import { ParametroState } from '../../store/states/api/parametro.state';
import { Parametro } from '../../entities/parametro';
import { MessageModule } from 'primeng/message';
import { PersonaState } from '../../store/states/api/persona.state';

@Component({
  selector: 'app-catedras-docente',
  standalone: true,
  imports: [CommonModule, RouterModule, CardModule, MessageModule, TableModule, ButtonModule, IconFieldModule, InputIconModule, InputTextModule, DropdownModule, FormsModule, DialogModule, ToolbarModule, PanelModule, MessagesModule],
  templateUrl: './catedras-docente.component.html',
  styleUrl: './catedras-docente.component.scss'
})
export class CatedrasDocenteComponent implements OnInit {
 
  public parametro$:Observable<Parametro | null> = this.store.select(ParametroState.getParameterSelected);
  public loading$:Observable<boolean> = this.store.select(PersonaState.getLoading);
  public generalLoading$:Observable<boolean> = this.store.select(AppPageState.getGeneralLoading);
  
  profesor$: Observable<Profesor | null> = this.store.select(PersonaPageState.getProfesorSelected);
  personaid$: Observable<string> = this.store.select(AppPageState.getPersonId);
  profesor!: Profesor;
  cursos: DocenteCurso[] = [];
  cursosFiltrados: DocenteCurso[] = [];
  

  estados = [
    { label: 'Todos los estados', value: '' },
    { label: 'TEORIA', value: 'TEORIA' },
    { label: 'PRACTICA', value: 'PRACTICA' }
  ];
  selectedEstado: string = '';

  // Propiedades responsivas para la tabla
  rowsPerPage: number = 5; // Móvil por defecto
  rowsPerPageOptions: number[] = [5, 10, 25, 50];

  displayResumenModal: boolean = false;
  resumenEstados = {
    teoria:0,
    practica:0,
    total:0
  };

  constructor(private store:Store) { }

  async ngOnInit(): Promise<void> {
    // Configurar filas responsivas basado en el tamaño de pantalla
    this.updateRowsPerPage();
    window.addEventListener('resize', () => this.updateRowsPerPage());

    const personaId = await firstValueFrom(this.personaid$.pipe(filter(id => id !== '')));
    let filters = new DocenteFilter();
    filters.incluirAsignaciones = true;

    this.store.dispatch(new GetProfesorByIdAction(personaId, filters));

    this.profesor$.subscribe(profesor => {
      if (profesor) {
        this.profesor = profesor;
        this.cursos = profesor.cursos_asignados || [];
        this.cursosFiltrados = this.cursos;
      }
    });
  }

  private updateRowsPerPage(): void {
    const width = window.innerWidth;
    if (width < 640) { // sm
      this.rowsPerPage = 5;
    } else if (width < 768) { // md
      this.rowsPerPage = 8;
    } else if (width < 1024) { // lg
      this.rowsPerPage = 10;
    } else { // xl y superior
      this.rowsPerPage = 15;
    }
  }

  showResumenModal() {
    this.calcularResumenEstados();
    this.displayResumenModal = true;
  }

  private calcularResumenEstados() {

    this.resumenEstados = {
      teoria: this.cursos.length,
      practica: this.cursos.length,
      total: this.cursos.length
    };
  }

  onEstadoChange(event: any) {
    const estadoSeleccionado = event.value;
    
    if (!estadoSeleccionado || estadoSeleccionado === '') {

      this.cursosFiltrados = this.cursos;
    } else {

      if (estadoSeleccionado === 'TEORIA' || estadoSeleccionado === 'PRACTICA') {
        this.cursosFiltrados = this.cursos;
      } else {
        this.cursosFiltrados = [];
      }
    }
  }

}
