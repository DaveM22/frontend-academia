import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { PlanesModalComponent } from '../../modals/planes-modal/planes-modal.component';
import { ButtonModule } from 'primeng/button';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { ToastModule } from 'primeng/toast';
import { RippleModule } from 'primeng/ripple';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputGroupModule } from 'primeng/inputgroup';
import { CommonModule } from '@angular/common';
import { ClearSelectedPlanInModal, ShowPlanModal } from '../../../store/actions/pages/app.action';
import { Observable } from 'rxjs';
import { Plan } from '../../../entities/plan';
import { AppPageState } from '../../../store/states/page/app.state';
import { ComisionState } from '../../../store/states/api/comision.state';
import { ComisionPageState } from '../../../store/states/page/comision.state';
import { Router } from '@angular/router';
import { ClearComisionAction } from '../../../store/actions/pages/comision.action';
import { ClearSelectedPlan } from '../../../store/actions/pages/plan.action';
import { Comision, ComisionDto } from '../../../entities/comision';
import { PostComisionAction, PutComisionAction } from '../../../store/actions/api/comision.action';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-comision-form',
  standalone: true,
  imports: [ReactiveFormsModule,
    InputTextModule,
    CardModule,
    ButtonModule,
    ToastModule, RippleModule, InputNumberModule, InputGroupModule, PlanesModalComponent, CommonModule],
  templateUrl: './comision-form.component.html',
  styleUrl: './comision-form.component.scss'
})
export class ComisionFormComponent implements OnInit, OnDestroy {
  @Input() title!:string;
  planSelected$: Observable<Plan | null> = this.store.select(AppPageState.getSelectedPlanInModal);
  form!: FormGroup;
  comision!:ComisionDto;
  plan!:Plan;
  constructor(private store: Store,  private router:Router, private messageService:MessageService) { }




  ngOnInit(): void {
    this.form = new FormGroup({
      _id: new FormControl(null),
      descripcion: new FormControl('', [Validators.required]),
      anioEspecialidad: new FormControl(0, [Validators.required]),
      plan: new FormControl('', [Validators.required]),
      planId: new FormControl('', [Validators.required])
    });
    this.pathValues();
    this.subscripcionPlanSelected();
  }


  pathValues(){
    let comision = this.store.selectSnapshot(ComisionPageState.getComisionSelected)!
    if(comision._id !== ""){
      this.form.patchValue(comision);
      this.form.patchValue({'plan': comision.plan.descripcion, 'planId':comision.plan._id});
    }
  }

  ngOnDestroy(): void {
    this.store.dispatch(new ClearSelectedPlanInModal);
  }


  redirectComisiones() {
    this.store.dispatch(new ClearComisionAction);

    this.router.navigate(["/comisiones/lista"]);
  }




  public onSubmit() { 
    this.comision = this.form.value
    console.log(this.comision)
    if(this.comision._id === null){
      this.store.dispatch(new PostComisionAction(this.comision)).subscribe(() => {
        this.router.navigate(["/comisiones/lista"])
        this.messageService.add({ severity: 'success', summary: 'Crear comisión', detail: 'Se ha creado la comision' });
      });

    }
    else{
      this.store.dispatch(new PutComisionAction(this.comision)).subscribe(x => this.router.navigate(["/comisiones/lista"]));
      this.store.dispatch(new ClearComisionAction());
      this.messageService.add({ severity: 'success', summary: 'Editar comisión', detail: 'Se han guardado los cambios de la comisión' });
    }
    this.form.reset();

  }

  subscripcionPlanSelected(){
    this.planSelected$.subscribe(x => {
      if (x !== null) {
        this.plan = x!;
        this.form.patchValue({ 'plan': this.plan.descripcion, 'planId': this.plan._id });
      }
    })
  }


  toggleModalPlanes() {
    this.store.dispatch(new ShowPlanModal(true));
  }
}
