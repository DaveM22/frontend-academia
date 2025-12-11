import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { ButtonModule } from 'primeng/button';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { MessagesModule } from 'primeng/messages';
import { PanelModule } from 'primeng/panel';
import { TableModule } from 'primeng/table';
import { ToolbarModule } from 'primeng/toolbar';
import { filter, firstValueFrom, Observable } from 'rxjs';
import { DocenteCurso } from '../../entities/docente-curso';
import { DocenteFilter } from '../../entities/filter';
import { Profesor } from '../../entities/profesor';
import { GetProfesorByIdAction } from '../../store/actions/api/persona.action';
import { AppPageState } from '../../store/states/page/app.state';
import { PersonaPageState } from '../../store/states/page/persona.state';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { BlockUiComponent } from '../../components/util/block-ui/block-ui.component';

@Component({
  selector: 'app-catedras-docente-cursos',
  standalone: true,
  imports: [CommonModule, ToolbarModule, PanelModule, TableModule, ButtonModule, IconFieldModule, InputIconModule, MessagesModule, InputTextModule, DropdownModule, FormsModule, DialogModule, ProgressSpinnerModule],
  templateUrl: './catedras-docente-cursos.component.html',
  styleUrl: './catedras-docente-cursos.component.scss'
})
export class CatedrasDocenteCursosComponent {
  profesor$: Observable<Profesor | null> = this.store.select(PersonaPageState.getProfesorSelected);
  personaid$: Observable<string> = this.store.select(AppPageState.getPersonId);
  cursos: DocenteCurso[] = [];
  cursosFiltrados: DocenteCurso[] = [];
  loading$: boolean = true;

  estados = [
    { label: 'Todos los estados', value: '' },
    { label: 'TEORIA', value: 'TEORIA' },
    { label: 'PRACTICA', value: 'PRACTICA' }
  ];
  selectedEstado: string = '';

  rowsPerPage: number = 5;
  rowsPerPageOptions: number[] = [5, 10, 25, 50];
  displayResumenModal: boolean = false;
  resumenEstados = { teoria: 0, practica: 0, total: 0 };

  constructor(private store: Store, private router: Router) { }

  async ngOnInit(): Promise<void> {
    this.updateRowsPerPage();
    window.addEventListener('resize', () => this.updateRowsPerPage());
    const personaId = await firstValueFrom(this.personaid$.pipe(filter(id => id !== '')));
    let filters = new DocenteFilter();
    filters.incluirAsignaciones = true;
    this.store.dispatch(new GetProfesorByIdAction(personaId, filters));
    this.profesor$.subscribe(profesor => {
      if (profesor) {
        this.cursos = profesor.cursos_asignados || [];
        this.cursosFiltrados = this.cursos;
      }
      this.loading$ = false;
    });
  }

  verInscriptos(curso: DocenteCurso) {
    const cursoId = curso.curso?._id;
    if (cursoId) {
      this.router.navigate([`docente/cursos-inscripciones/${cursoId}`]);
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
    } else if (estadoSeleccionado === 'TEORIA' || estadoSeleccionado === 'PRACTICA') {
      this.cursosFiltrados = this.cursos;
    } else {
      this.cursosFiltrados = [];
    }
  }

  private updateRowsPerPage(): void {
    const width = window.innerWidth;
    if (width < 640) {
      this.rowsPerPage = 5;
    } else if (width < 768) {
      this.rowsPerPage = 8;
    } else if (width < 1024) {
      this.rowsPerPage = 10;
    } else {
      this.rowsPerPage = 15;
    }
  }
}
