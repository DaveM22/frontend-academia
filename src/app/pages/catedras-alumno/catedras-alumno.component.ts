import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { MessagesModule } from 'primeng/messages';
import { TableModule } from 'primeng/table';
import { ToolbarModule } from 'primeng/toolbar';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { EspecialidadFilterComponent } from '../../components/filters/especialidad-filter/especialidad-filter.component';
import { PlanFilterComponent } from '../../components/filters/plan-filter/plan-filter.component';
import { Store } from '@ngxs/store';
import { ActivatedRoute } from '@angular/router';
import { AlumnoFilter } from '../../entities/filter';
import { GetAlumnoByIdAction } from '../../store/actions/api/persona.action';
import { AppPageState } from '../../store/states/page/app.state';
import { firstValueFrom, Observable } from 'rxjs';
import { Alumno } from '../../entities/alumno';
import { PersonaPageState } from '../../store/states/page/persona.state';
import { Persona } from '../../entities/persona';
import { AlumnoInscripcion } from '../../entities/alumno-inscripcion';
import { PanelModule } from 'primeng/panel';
import { PersonaState } from '../../store/states/api/persona.state';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { filter, distinctUntilChanged, takeUntil, concatMap, last, take, first } from 'rxjs/operators';
import { Condicion, CondicionList } from '../../entities/enums';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { BlockUiComponent } from '../../components/util/block-ui/block-ui.component';
import { MobileSortSelectComponent, SortOption } from '../../components/util/mobile-sort-select/mobile-sort-select.component';

@Component({
  selector: 'app-catedras-alumno',
  standalone: true,
  imports: [CommonModule, ToolbarModule, PanelModule, TableModule, ButtonModule, IconFieldModule, InputIconModule, MessagesModule, InputTextModule, CardModule, DropdownModule, FormsModule, DialogModule, ProgressSpinnerModule, MobileSortSelectComponent],
  templateUrl: './catedras-alumno.component.html',
  styleUrl: './catedras-alumno.component.scss'
})
export class CatedrasAlumnoComponent implements OnInit {
  persona$: Observable<Alumno | null> = this.store.select(PersonaPageState.getAlumnoSelected);
  personaid$: Observable<string> = this.store.select(AppPageState.getPersonId);
  persona!: Alumno;
  loading$: Observable<boolean> = this.store.select(PersonaState.getLoading)
  inscripciones: AlumnoInscripcion[] = [];
  inscripcionesFiltradas: AlumnoInscripcion[] = [];
  
  // Propiedades para el filtro
  condiciones = [
    { label: 'Todas las condiciones', value: '' },
    { label: 'APROBADO', value: Condicion.APROBADO },
    { label: 'REGULAR', value: Condicion.REGULAR },
    { label: 'INSCRIPTO', value: Condicion.INSCRIPTO },
    { label: 'LIBRE', value: Condicion.LIBRE }
  ];
  selectedCondicion: string = '';

  // Propiedades responsivas para la tabla
  rowsPerPage: number = 5; // Móvil por defecto
  rowsPerPageOptions: number[] = [5, 10, 25, 50];
  sortOptions: SortOption[] = [
    { label: 'Cátedra', field: 'curso.materia.descripcion' },
    { label: 'Comisión', field: 'curso.comision.descripcion' },
    { label: 'Condición', field: 'condicion' }
  ];

  // Propiedades para el modal de resumen
  displayResumenModal: boolean = false;
  resumenCondiciones = {
    aprobado: 0,
    regular: 0,
    inscripto: 0,
    libre: 0,
    total: 0
  };

  constructor(private store: Store) { }

  async ngOnInit(): Promise<void> {
    // Configurar filas responsivas basado en el tamaño de pantalla
    this.updateRowsPerPage();
    window.addEventListener('resize', () => this.updateRowsPerPage());

    const personaId = await firstValueFrom(this.personaid$.pipe(filter(id => id !== '')));
    let filters = new AlumnoFilter();
    filters.incluirInscripciones = true;

    this.store.dispatch(new GetAlumnoByIdAction(personaId, filters))

    const persona = await firstValueFrom(this.persona$.pipe(filter(p => p !== null)));
    this.persona = persona!;
    this.inscripciones = this.persona.inscripciones;
    this.inscripcionesFiltradas = this.inscripciones; // Inicialmente mostrar todas
  }

  showResumenModal() {
    this.calcularResumenCondiciones();
    this.displayResumenModal = true;
  }

  private calcularResumenCondiciones() {
    this.resumenCondiciones = {
      aprobado: this.inscripciones.filter(i => i.condicion === Condicion.APROBADO).length,
      regular: this.inscripciones.filter(i => i.condicion === Condicion.REGULAR).length,
      inscripto: this.inscripciones.filter(i => i.condicion === Condicion.INSCRIPTO).length,
      libre: this.inscripciones.filter(i => i.condicion === Condicion.LIBRE).length,
      total: this.inscripciones.length
    };
  }

  onCondicionChange(event: any) {
    const condicionSeleccionada = event.value;
    
    if (!condicionSeleccionada || condicionSeleccionada === '') {
      // Mostrar todas las inscripciones
      this.inscripcionesFiltradas = this.inscripciones;
    } else {
      // Filtrar por condición seleccionada
      this.inscripcionesFiltradas = this.inscripciones.filter(
        inscripcion => inscripcion.condicion === condicionSeleccionada
      );
    }
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

}
