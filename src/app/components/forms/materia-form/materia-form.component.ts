import { Component, Input } from '@angular/core';
import { Materia } from '../../../entities/materia';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store, setValue } from '@ngxs/store';
import { ActivatedRoute, Router } from '@angular/router';
import { PlanPageState } from '../../../store/states/page/plan.page.state';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { MateriaPageState } from '../../../store/states/page/materia.page.state';
import { InputNumberModule } from 'primeng/inputnumber';
import { PostPlanAction } from '../../../store/actions/api/planes.action';
import { PutMateriaAction, PostMateriaAction } from '../../../store/actions/api/materia.action';
import { ClearMateriaAction } from '../../../store/actions/pages/materia.action';

@Component({
  selector: 'app-materia-form',
  standalone: true,
  imports: [ReactiveFormsModule, InputTextModule, CardModule, ButtonModule, InputNumberModule],
  templateUrl: './materia-form.component.html',
  styleUrl: './materia-form.component.scss'
})
export class MateriaFormComponent {
  form!: FormGroup;
  @Input() title!:string;
  materia!: Materia;
  planId!: string;

  constructor(private store:Store, private router:Router, private activatedRoute:ActivatedRoute){}

  ngOnInit(): void {
    this.planId = this.activatedRoute.snapshot.params['id'];
    this.form = new FormGroup({
      _id: new FormControl(null),
      descripcion: new FormControl('', [Validators.required]),
      hsSemanales: new FormControl(0, [Validators.required]),
      hsTotales: new FormControl(0, [Validators.required]),
      planId: new FormControl('', [Validators.required]),
    });
    this.form.patchValue(this.store.selectSnapshot(MateriaPageState.getMateriaSelected)!);
    this.form.patchValue({'planId': this.planId});
  }

  public onSubmit(){
    this.materia = this.form.value
    if(this.form.value._id === ''){
      this.store.dispatch(new PostMateriaAction(this.materia!)).subscribe(x =>this.router.navigate([`/planes/${this.planId}/materias`]));
    }
    else{
      this.store.dispatch(new PutMateriaAction(this.materia!)).subscribe(x =>this.router.navigate([`/planes/${this.planId}/materias`]));
      this.store.dispatch(new ClearMateriaAction);
    }
    this.form.reset(); 
  }

  public redirectPlanMaterias(){
    this.store.dispatch(new ClearMateriaAction);
    this.router.navigate([`/planes/${this.planId}/materias`]);
  }

}
