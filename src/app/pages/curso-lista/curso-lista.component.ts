import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Curso } from '../../entities/curso';
import { CursoFilter } from '../../entities/filter';
import { ClearCursos, DeleteCursoAction, GenerateReport, GetByIdCursoAction, GetCursoAction } from '../../store/actions/api/curso.action';
import { CursoState } from '../../store/states/api/curso.state';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { MessagesModule } from 'primeng/messages';
import { PanelModule } from 'primeng/panel';
import { TableModule } from 'primeng/table';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { LoadingForm, ShowModalConfirmationAction } from '../../store/actions/pages/app.action';
import { AppPageState } from '../../store/states/page/app.state';
import { IconFieldModule } from 'primeng/iconfield';
import { InputTextModule } from 'primeng/inputtext';
import { InputIconModule } from 'primeng/inputicon';
import { MessageModule } from 'primeng/message';
import { DialogModule } from 'primeng/dialog';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { BlockUiComponent } from '../../components/util/block-ui/block-ui.component';
import { MobileSortSelectComponent, SortOption } from '../../components/util/mobile-sort-select/mobile-sort-select.component';

@Component({
  selector: 'app-curso-lista',
  standalone: true,
  imports: [CommonModule, TableModule, ButtonModule, MessageModule, PanelModule, ConfirmDialogModule, IconFieldModule, InputTextModule, InputIconModule, DialogModule, ProgressSpinnerModule, MobileSortSelectComponent],
  templateUrl: './curso-lista.component.html',
  styleUrl: './curso-lista.component.scss',
  providers: [ConfirmationService]
})
export class CursoListaComponent implements OnInit , OnDestroy {
  rowsPerPage = 5;
  public cursos: Curso[] = [];
  public cursos$: Observable<Curso[]> = this.store.select(CursoState.getCursos)

  public loading$: Observable<boolean> = this.store.select(AppPageState.getFormLoading);

  sortOptions: SortOption[] = [
    { label: 'Año calendario', field: 'anioCalendario' },
    { label: 'Curso', field: 'descripcion' },
    { label: 'Comisión', field: 'comision.descripcion' }
  ];

  public error$: Observable<boolean> = this.store.select(CursoState.getError);

  public errorMessage$: Observable<string> = this.store.select(CursoState.getErrorMessage);
  curso!: Curso;

  cursoSelected!: Curso;

  showModal: boolean = false;
  selectedCurso: Curso | null = null;

  showConfirmation$: Observable<boolean> = this.store.select(AppPageState.showModalConfirmation)

  constructor(private store: Store, private router: Router, private confirmationService: ConfirmationService, private messageService: MessageService) {

  }
  ngOnDestroy(): void {
    this.store.dispatch(new ClearCursos());
  }

  ngOnInit(): void {
    this.cursos$.subscribe(x => this.cursos = x ? [...x] : []);
    this.updateRowsPerPage();
    const filters = new CursoFilter();
    filters.mostrarComision = true;
    filters.mostrarMateria = true;
    this.store.dispatch(new GetCursoAction(filters));
    this.showConfirmation$.subscribe(x => {
      if (x && this.cursoSelected) {
        this.confirm();
      }
    })
  }

  redirectNewCurso() {
    this.router.navigate(["/cursos/nuevo"]);
  }

  redirectEditCurso(id: string) {
    this.store.dispatch(new LoadingForm(true));
    this.store.dispatch(new GetByIdCursoAction(id)).subscribe(() => {
      this.store.dispatch(new LoadingForm(false));
      this.router.navigate(["/cursos/editar/" + id]);
    })
  }

  generateReport(id: string) {
    this.store.dispatch(new GenerateReport(id));
  }

  title = 'academia';

  @HostListener('window:resize')
  onResize() {
    this.updateRowsPerPage();
  }

  private updateRowsPerPage() {
    const width = window.innerWidth;
    if (width < 600) {
      this.rowsPerPage = 6;
    } else if (width < 960) {
      this.rowsPerPage = 5;
    } else if (width < 1280) {
      this.rowsPerPage = 8;
    } else if (width < 1920) {
      this.rowsPerPage = 10;
    } else {
      this.rowsPerPage = 10;
    }
  }

  confirm() {
    this.confirmationService.confirm({
      header: 'Borrar curso',
      message: `¿ Desea eliminar el siguiente curso: ${this.cursoSelected.descripcion!} ?`,
      acceptIcon: 'pi pi-check mr-2',
      rejectIcon: 'pi pi-times mr-2',
      rejectButtonStyleClass: 'p-button-sm',
      acceptButtonStyleClass: 'p-button-outlined p-button-sm',
      accept: () => {
        const previousError = this.store.selectSnapshot(CursoState.getError);
        this.store.dispatch(new DeleteCursoAction(this.cursoSelected._id))
          .subscribe({
            next: () => {
              this.store.dispatch(new ShowModalConfirmationAction(false))
              
              // Si había error antes y ahora no lo hay, significa que fue exitoso
              const currentError = this.store.selectSnapshot(CursoState.getError);
              if (!currentError) {
                this.messageService.add({ severity: 'success', summary: 'Borrar curso', detail: `Se ha borrado el curso: ${this.cursoSelected.descripcion}` });
              }
            },
            error: (err) => {
              console.error('Error deleting curso:', err);
              this.store.dispatch(new ShowModalConfirmationAction(false));
            }
          })
      },
      reject: () => {
        this.store.dispatch(new ShowModalConfirmationAction(false))
      }
    });
  }

  modalConfirmar(curso: Curso) {
    this.cursoSelected = curso;
    this.store.dispatch(new ShowModalConfirmationAction(true));
  }

  showCursoModal(curso: Curso) {
    console.log('Curso seleccionado:', curso);
    this.selectedCurso = curso;
    this.showModal = true;
    console.log('selectedCurso después de asignar:', this.selectedCurso);
    console.log('showModal:', this.showModal);
  }

  closeModal() {
    this.showModal = false;
    this.selectedCurso = null;
  }

}
