import { Component, Input, OnInit } from "@angular/core";
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { ButtonModule } from "primeng/button";
import { CardModule } from "primeng/card";
import { InputTextModule } from "primeng/inputtext";
import { Especialidad } from "../../../entities/especialidad";
import { Store } from "@ngxs/store";
import { Router } from "@angular/router";
import { PlanState } from "../../../store/states/api/plan.state";
import { GetEspecialidadAction, PostEspecialidadAction } from "../../../store/actions/api/especialidad.action";
import { PostPlanAction, PutPlanAction } from "../../../store/actions/api/planes.action";
import { Plan } from "../../../entities/plan";
import { ClearSelectedPlan } from "../../../store/actions/pages/plan.action";
import { PlanPageState } from "../../../store/states/page/plan.page.state";
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { DropdownModule } from "primeng/dropdown";
import { Observable } from "rxjs";
import { EspecialidadState } from "../../../store/states/api/especialidad.state";
import { CommonModule } from "@angular/common";
import { PlanDto } from "../../../dtos/plan.dto";
import { MessageService } from "primeng/api";
@Component({
  selector: 'app-plan-form',
  standalone: true,
  imports: [ReactiveFormsModule, InputTextModule, CardModule, ButtonModule, InputGroupModule, InputGroupAddonModule, DropdownModule, CommonModule],
  templateUrl: './plan-form.component.html',
  styleUrl: './plan-form.component.scss'
})
export class PlanFormComponent implements OnInit {
  especialidades$: Observable<Especialidad[]> = this.store.select(EspecialidadState.getEspecialidades)
  form!: FormGroup;
  plan!:PlanDto;
  @Input() title!:string;
  selectedEspecialidad!:Especialidad[]
  especialidades!:Especialidad[]

  constructor(private store:Store, private router:Router, private messageService:MessageService){}

  ngOnInit(): void {
    this.store.dispatch(new GetEspecialidadAction);
    this.form = new FormGroup({
      _id: new FormControl(null),
      descripcion: new FormControl('', [Validators.required]),
      especialidadId: new FormControl('', [Validators.required]),
    });
    const plan = this.store.selectSnapshot(PlanPageState.getPlanSelected);
    if (plan) {
      this.form.patchValue(plan);
      this.form.patchValue({'especialidadId': plan.especialidad._id});
    }
  }

  public onSubmit(){
    console.log("submitea")
    this.plan = this.form.value
    if(this.form.value._id === ''){
      this.store.dispatch(new PostPlanAction(this.plan)).subscribe(x => {
        this.router.navigate(["/planes/lista"]);
        this.messageService.add({ severity: 'success', summary: 'Crear plan', detail: 'Se ha creado el plan' });
      });

    }
    else{
      this.store.dispatch(new PutPlanAction(this.plan)).subscribe(x => {
        this.router.navigate(["/planes/lista"])
        this.messageService.add({ severity: 'success', summary: 'Editar plan', detail: 'Se han guardado los cambios del plan' });
      });
    }
    this.store.dispatch(new ClearSelectedPlan);
    this.form.reset();
  }

  public redirectPlanes(){
    this.store.dispatch(new ClearSelectedPlan);
    this.router.navigate(["/planes/lista"]);
  }

}