import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { MessagesModule } from 'primeng/messages';
import { TableModule } from 'primeng/table';
import { filter, firstValueFrom, Observable } from 'rxjs';
import { PlanState } from '../../store/states/api/plan.state';
import { Plan } from '../../entities/plan';
import { GetByIdPlanAction, GetPlanByIdWithMateriasAction } from '../../store/actions/api/planes.action';
import { ActivatedRoute, Router } from '@angular/router';
import { Materia } from '../../entities/materia';
import { ButtonModule } from 'primeng/button';
import { PlanFilter } from '../../entities/filter';
import { PlanPageState } from '../../store/states/page/plan.page.state';
import { ConfirmationService, MessageService } from 'primeng/api';
import { AppPageState } from '../../store/states/page/app.state';
import { LoadingForm, ShowModalConfirmationAction } from '../../store/actions/pages/app.action';
import { DeleteMateria, GetByIdMateriaAction } from '../../store/actions/api/materia.action';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ScreenSizeService } from '../../services/screen-size.service.service';
import { MateriaState } from '../../store/states/api/materia.state';
import { ClearSelectedPlan } from '../../store/actions/pages/plan.action';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { BlockUiComponent } from '../../components/util/block-ui/block-ui.component';

@Component({
  selector: 'app-plan-materias',
  standalone: true,
  imports: [TableModule, CommonModule, MessagesModule, ButtonModule, ConfirmDialogModule, ProgressSpinnerModule, BlockUiComponent],
  templateUrl: './plan-materias.component.html',
  styleUrl: './plan-materias.component.scss',
  providers: [ConfirmationService]
})
export class PlanMateriasComponent implements OnInit {
  error$: Observable<boolean> = this.store.select(PlanState.getError);
  errorMessage$: Observable<string> = this.store.select(PlanState.getErrorMessage);
  loading$: Observable<boolean> = this.store.select(AppPageState.getFormLoading);
  planSelected$: Observable<Plan | null> = this.store.select(PlanPageState.getPlanSelected);
  showConfirmation$: Observable<boolean> = this.store.select(AppPageState.showModalConfirmation)
  plan!: Plan;
  materias: Materia[] = []
  header!: string;
  id!: string;
  materiaSelected!: Materia;
  scrollSize: string = "flex";
  constructor(
    private store: Store,
    private activadedRoute: ActivatedRoute,
    private router: Router,
    private confimationService: ConfirmationService,
    private messageService: MessageService,
    private screenService: ScreenSizeService) {

  }
  ngOnInit(): void {

    this.id = this.activadedRoute.snapshot.params['id'];
    const planFilter = new PlanFilter();
    planFilter.incluirMaterias = true;
    this.store.dispatch(new GetByIdPlanAction(this.id, planFilter));


    this.showConfirmation$.subscribe(x => {
      if (x && this.materiaSelected) {
        this.confirm();
      }
    })

    this.planSelected$.subscribe(plan => {
      if (plan) {
        this.plan = plan!;
        this.materias = this.plan.materias ? [...this.plan.materias] : [];
        this.header = this.plan.descripcion;

      }

    });

    this.screenService.screenSize$.subscribe((x: any) => {
      this.scrollSize = x.currentTarget.innerWidth > 992 ? 'flex' : '50vh'
    })

  }

  redirectMateriaNuevo() {
    this.router.navigate([`/planes/${this.id}/materias/nuevo`]);
  }

  redirectMateriaEditar(materiaId: string) {
    this.store.dispatch(new LoadingForm(true));
    this.store.dispatch(new GetByIdMateriaAction(materiaId)).subscribe(() => {
      this.store.dispatch(new LoadingForm(false));
      this.router.navigate([`/planes/${this.id}/materias/editar/${materiaId}`]);
    });
  }

  redirectPlanes() {
    this.store.dispatch(new ClearSelectedPlan);
    this.router.navigate(['/planes/lista']);
  }


  confirm() {

    this.confimationService.confirm({
      header: 'Borrar materia',
      message: `'¿Desea eliminar la siguiente materia: ${this.materiaSelected!.descripcion!} ?`,
      acceptIcon: 'pi pi-check mr-2',
      rejectIcon: 'pi pi-times mr-2',
      rejectButtonStyleClass: 'p-button-sm',
      acceptButtonStyleClass: 'p-button-outlined p-button-sm',
      accept: () => {
        this.store.dispatch(new DeleteMateria(this.materiaSelected))
          .subscribe(() => {
            this.store.dispatch(new ShowModalConfirmationAction(false))
            this.messageService.add({ severity: 'success', summary: 'Borrar materia', detail: `Se ha borrado la materia: ${this.materiaSelected.descripcion}` });
          })
      },
      reject: () => {
        this.store.dispatch(new ShowModalConfirmationAction(false))
      }
    });
  }

  modalConfirmar(materia: Materia) {
    this.materiaSelected = materia;
    this.store.dispatch(new ShowModalConfirmationAction(true));
  }

}
