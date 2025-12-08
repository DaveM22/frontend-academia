import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Comision } from '../../entities/comision';
import { ComisionFilter } from '../../entities/filter';
import { ComisionState } from '../../store/states/api/comision.state';
import { DeleteComisionAction, GetByIdComisionAction, GetComision } from '../../store/actions/api/comision.action';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { MessageModule } from 'primeng/message';
import { PanelModule } from 'primeng/panel';
import { TableModule } from 'primeng/table';
import { ConfirmationService, MessageService } from 'primeng/api';
import { LoadingForm, ShowModalConfirmationAction } from '../../store/actions/pages/app.action';
import { AppPageState } from '../../store/states/page/app.state';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { ScreenSizeService } from '../../services/screen-size.service.service';
import { PlanFilterComponent } from '../../components/filters/plan-filter/plan-filter.component';
import { Plan } from '../../entities/plan';
import { GetPlanAction } from '../../store/actions/api/planes.action';
import { PlanFilter } from '../../entities/filter';
import { SelectedPlanFilter } from '../../store/actions/pages/app.action';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { BlockUiComponent } from '../../components/util/block-ui/block-ui.component';

@Component({
  selector: 'app-comision-lista',
  standalone: true,
  imports: [CommonModule, TableModule, ButtonModule, MessageModule, PanelModule,BlockUiComponent, ConfirmDialogModule, IconFieldModule, InputTextModule, InputIconModule, PlanFilterComponent, ProgressSpinnerModule],
  templateUrl: './comision-lista.component.html',
  styleUrl: './comision-lista.component.scss',
  providers: [ConfirmationService]
})
export class ComisionListaComponent implements OnInit {
  rowsPerPage = 5;
  public comisiones$: Observable<Comision[]> = this.store.select(ComisionState.getComisiones)

  public loading$: Observable<boolean> = this.store.select(AppPageState.getFormLoading);

  public error$: Observable<boolean> = this.store.select(ComisionState.getError);

  public errorMessage$: Observable<string> = this.store.select(ComisionState.getErrorMessage);

  public Comision!: Comision;
  showConfirmation$: Observable<boolean> = this.store.select(AppPageState.showModalConfirmation)
  public comisionSelected!: Comision;
  public planSelected$ = this.store.select(AppPageState.getSelectedPlanInFilter);
  public error: boolean = false;
  scrollSize: string = "flex";
  constructor(private store: Store, private router: Router, private confirmationService: ConfirmationService, private messageService: MessageService, private screenService: ScreenSizeService) {

  }


  ngOnInit(): void {
    let filters = new ComisionFilter();
    filters.mostrarPlan = true;
    this.store.dispatch(new GetComision(filters));

    // Cargar planes para el filtro
    let planFilter = new PlanFilter();
    planFilter.mostrarEspecialidad = true;
    this.store.dispatch(new GetPlanAction(planFilter));

    this.updateRowsPerPage();
    this.error$.subscribe(x => this.error = x);
    this.showConfirmation$.subscribe(x => {
      if (x && this.comisionSelected) {
        this.confirm();
      }
    })

    this.screenService.screenSize$.subscribe((x: any) => {
      this.scrollSize = x.currentTarget.innerWidth > 992 ? 'flex' : '50vh'
    })


    this.planSelected$.subscribe(plan => {
      if (plan) {
        let filter = new ComisionFilter();
        filter.mostrarPlan = true;
        filter.planId = plan._id!;
        this.store.dispatch(new GetComision(filter));
      } else {
        let filter = new ComisionFilter();
        filter.mostrarPlan = true;
        this.store.dispatch(new GetComision(filter));
      }
    });
  }


  redirectNuevaComision() {
    this.router.navigate(["/comisiones/nuevo"]);
  }

  onPlanChanged(plan: Plan | null) {
    if (plan) {
      this.store.dispatch(new SelectedPlanFilter(plan));
    } else {
      this.store.dispatch(new SelectedPlanFilter(plan!));
    }
  }

  redirectEditarComision(id: string) {
    this.store.dispatch(new LoadingForm(true));
    this.store.dispatch(new GetByIdComisionAction(id)).subscribe(() => {
      this.store.dispatch(new LoadingForm(false));
      this.router.navigate(["/comisiones/editar/" + id]);
    })
  }

  Comisiones!: Comision[];
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
      header: 'Borrar comisión',
      message: `¿Desea eliminar la siguiente comisión: ${this.comisionSelected!.descripcion!} ?`,
      acceptIcon: 'pi pi-check mr-2',
      rejectIcon: 'pi pi-times mr-2',
      acceptLabel: 'Borrar',
      rejectLabel: 'Cancelar',
      rejectButtonStyleClass: 'p-button-sm',
      acceptButtonStyleClass: 'p-button-outlined p-button-sm',
      accept: () => {
        this.store.dispatch(new DeleteComisionAction(this.comisionSelected._id))
          .subscribe(() => {
            if (!this.error) {
              this.store.dispatch(new ShowModalConfirmationAction(false))
              this.messageService.add({ severity: 'success', summary: 'Borrar comisión', detail: `Se ha borrado la comisión: ${this.comisionSelected.descripcion}` });
            }
            this.store.dispatch(new ShowModalConfirmationAction(false));
          })
      },
      reject: () => {
        this.store.dispatch(new ShowModalConfirmationAction(false));
      }
    });
  }

  modalConfirmar(comision: Comision) {
    this.comisionSelected = comision;
    this.store.dispatch(new ShowModalConfirmationAction(true));
  }
}
