import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';
import { PlanPageState } from '../../../store/states/page/plan.page.state';
import { GetByIdPlanAction, GetByIdPlanForCursoAction, PostPlanAction } from '../../../store/actions/api/planes.action';
import { Curso, CursoDto } from '../../../entities/curso';
import { PostCursoAction, PutCursoAction } from '../../../store/actions/api/curso.action';
import { CursoPageState } from '../../../store/states/page/curso.state';
import { ClearSelectedCursoAction } from '../../../store/actions/pages/curso.action';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputGroupModule } from 'primeng/inputgroup';
import { PlanesModalComponent } from '../../modals/planes-modal/planes-modal.component';
import { ShowComisionesModal, ShowMateriaModal, ShowPlanModal } from '../../../store/actions/pages/app.action';
import { Observable } from 'rxjs';
import { Plan } from '../../../entities/plan';
import { AppPageState } from '../../../store/states/page/app.state';
import { CommonModule } from '@angular/common';
import { ComisionState } from '../../../store/states/api/comision.state';
import { MateriasModalComponent } from '../../modals/materias-modal/materias-modal.component';
import { Materia } from '../../../entities/materia';
import { Comision } from '../../../entities/comision';
import { ComisionesModalComponent } from '../../modals/comisiones-modal/comisiones-modal.component';
import { PlanFilter } from '../../../entities/filter';

@Component({
  selector: 'app-curso-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    InputTextModule,
    CardModule,
    ButtonModule,
    ToastModule, RippleModule, InputNumberModule, InputGroupModule, 
    PlanesModalComponent,
    MateriasModalComponent,
    ComisionesModalComponent,
    CommonModule],
  templateUrl: './curso-form.component.html',
  styleUrl: './curso-form.component.scss'
})
export class CursoFormComponent {
  planSelected$: Observable<Plan | null> = this.store.select(AppPageState.getSelectedPlanInModal);
  materiaSelected$: Observable<Materia | null> = this.store.select(AppPageState.getSelectedMateriaInModal);
  comisionSelected$: Observable<Comision | null> = this.store.select(AppPageState.getSelectedComisionInModal);

  form!: FormGroup;
  @Input() title!: string;
  curso!: CursoDto;

  plan!: Plan;
  showModalPlanes: boolean = false;

  constructor(private store: Store, private router: Router, private messageService: MessageService) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      _id: new FormControl(null),
      descripcion: new FormControl('', [Validators.required]),
      anioCalendario: new FormControl(0, [Validators.required]),
      cupo: new FormControl(0, [Validators.required]),
      plan: new FormControl({value:'', disabled:true}, [Validators.required]),
      planId: new FormControl('', [Validators.required]),
      materia: new FormControl({value:'', disabled:true}, [Validators.required]),
      materiaId: new FormControl('', [Validators.required]),
      comision: new FormControl({value:'', disabled:true}, [Validators.required]),
      comisionId: new FormControl('', [Validators.required])
    });
    this.form.patchValue(this.store.selectSnapshot(ComisionState.getComisiones)!);
    this.subscripcionPlanSelected();
    this.subscriptionMateriaSelected();
    this.subscriptionComisionSelected();
  }


  public onSubmit() {
    this.curso = this.form.value
    if (this.form.value._id === null) {
      this.store.dispatch(new PostCursoAction(this.curso)).subscribe(() => {
        this.router.navigate(["/cursos/lista"])
      });
    }
    else {
      this.store.dispatch(new PutCursoAction(this.curso)).subscribe(x => this.router.navigate(["/cursos/lista"]));
      this.messageService.add({ severity: 'success', summary: 'Editar curso', detail: 'Se guardaron los cambios del curso' });
      this.store.dispatch(new ClearSelectedCursoAction);
    }
    this.form.reset();
  }

  public redirectCursos() {
    this.store.dispatch(new ClearSelectedCursoAction);
    this.router.navigate(["/cursos/lista"]);
  }

  toggleModalPlanes() {
    this.store.dispatch(new ShowPlanModal(true));
  }

  toggleModalMaterias() {
    this.store.dispatch(new ShowMateriaModal(true));
  }

  toggleModalComisiones() {
    this.store.dispatch(new ShowComisionesModal(true));
  }

  subscripcionPlanSelected(){
    this.planSelected$.subscribe(x => {
      if (x !== null) {
        this.plan = x!;
        this.form.patchValue({ 'plan': this.plan.descripcion, 'planId': this.plan._id });
        let filter = new PlanFilter();
        filter.incluirMaterias = true;
        filter.incluirComisiones = true;
        
        this.store.dispatch(new GetByIdPlanAction(this.plan._id, filter));
      }
    })
  }

  subscriptionMateriaSelected(){
    this.materiaSelected$.subscribe(x => {
      if (x !== null) {
        this.form.patchValue({ 'materia': x.descripcion, 'materiaId':x._id });
      }
    })
  }

  subscriptionComisionSelected(){
    this.comisionSelected$.subscribe(x => {
      if (x !== null) {
        this.form.patchValue({ 'comision': x.descripcion, 'comisionId':x._id });
      }
    })
  }
}
