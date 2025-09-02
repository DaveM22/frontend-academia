import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { PlanFilter } from '../../entities/filter';
import { Plan } from '../../entities/plan';
import { DeletePlanAction, GenerateReport, GetByIdPlanAction, GetPlanAction, GetPlanByIdWithMateriasAction } from '../../store/actions/api/planes.action';
import { PlanState } from '../../store/states/api/plan.state';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { TableModule } from 'primeng/table';
import { ToolbarModule } from 'primeng/toolbar';
import { EspecialidadFilterComponent } from '../../components/filters/especialidad-filter/especialidad-filter.component';
import { PlanFilterComponent } from '../../components/filters/plan-filter/plan-filter.component';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ShowModalConfirmationAction } from '../../store/actions/pages/app.action';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { AppPageState } from '../../store/states/page/app.state';

@Component({
  selector: 'app-plan-lista',
  standalone: true,
  imports: [ButtonModule, TableModule, CommonModule, MessageModule, IconFieldModule, InputIconModule, ConfirmDialogModule, InputTextModule],
  templateUrl: './plan-lista.component.html',
  styleUrl: './plan-lista.component.scss',
  providers: [ConfirmationService]
})
export class PlanListaComponent implements OnInit {
  public planes$: Observable<Plan[]> = this.store.select(PlanState.getPlanes)
  public loading$: Observable<boolean> = this.store.select(PlanState.getLoading);
  public error$: Observable<boolean> = this.store.select(PlanState.getError);
  public errorMessage$: Observable<string> = this.store.select(PlanState.getErrorMessage);
  showConfirmation$: Observable<boolean> = this.store.select(AppPageState.showModalConfirmation)
  public planSelected!: Plan;
  public plan!: Plan;
  error: boolean = false;

  constructor(
    private store: Store,
    private router: Router,
    private confirmationService: ConfirmationService,
    private messageService: MessageService) {
  }

  ngOnInit(): void {
    this.planes$.subscribe(x => this.planes = x);
    let filter = new PlanFilter();
    filter.mostrarEspecialidad = true
    this.store.dispatch(new GetPlanAction(filter));
    this.error$.subscribe(x => this.error = x);
    this.showConfirmation$.subscribe(x => {
      if (x && this.planSelected) {
        this.confirm();
      }
    })
  }

  showModal(plan: Plan) {
    this.plan = plan;
  }

  redirectToMaterias(id: string) {
    this.store.dispatch(new GetPlanByIdWithMateriasAction(id)).subscribe(() => this.router.navigate(["/planes/" + id + "/materias"]));
  }

  redirectNuevoPlan() {
    this.router.navigate(["planes/nuevo"]);
  }

  redirectEditarPlan(id: string) {
   this.store.dispatch(new GetByIdPlanAction(id, new PlanFilter())).subscribe(() => {
      this.router.navigate(["/planes/editar/" + id])
    })
  }

  generateReport(id: string) {
    this.store.dispatch(new GenerateReport(id));
  }

  planes!: Plan[];
  title = 'academia';

  confirm() {
    this.confirmationService.confirm({
      header: 'Borrar comisión',
      message: `¿Desea eliminar el siguiente plan: ${this.planSelected!.descripcion!} ?`,
      acceptIcon: 'pi pi-check mr-2',
      rejectIcon: 'pi pi-times mr-2',
      rejectButtonStyleClass: 'p-button-sm',
      acceptButtonStyleClass: 'p-button-outlined p-button-sm',
      accept: () => {
        this.store.dispatch(new DeletePlanAction(this.planSelected._id))
          .subscribe(() => {
            if (!this.error) {
              this.store.dispatch(new ShowModalConfirmationAction(false))
              this.messageService.add({ severity: 'success', summary: 'Borrar plan', detail: `Se ha borrado el plan: ${this.planSelected.descripcion}` });
            }
          })
          this.store.dispatch(new ShowModalConfirmationAction(false))
      },
      reject: () => {
        this.store.dispatch(new ShowModalConfirmationAction(false))
      }
    });
  }

  modalConfirmar(plan: Plan) {
    this.planSelected = plan;
    this.store.dispatch(new ShowModalConfirmationAction(true));
  }
}
