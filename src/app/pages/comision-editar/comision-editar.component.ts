import { Component, OnInit } from '@angular/core';
import { ComisionFormComponent } from '../../components/forms/comision-form/comision-form.component';
import { Observable } from 'rxjs';
import { Comision } from '../../entities/comision';
import { ComisionPageState } from '../../store/states/page/comision.state';
import { Store } from '@ngxs/store';
import { ActivatedRoute } from '@angular/router';
import { GetByIdPlanAction } from '../../store/actions/api/planes.action';
import { CommonModule } from '@angular/common';
import { GetByIdComisionAction } from '../../store/actions/api/comision.action';

@Component({
  selector: 'app-comision-editar',
  standalone: true,
  imports: [ComisionFormComponent, CommonModule],
  templateUrl: './comision-editar.component.html',
  styleUrl: './comision-editar.component.scss'
})
export class ComisionEditarComponent {
  comision$:Observable<Comision | null> = this.store.select(ComisionPageState.getComisionSelected);

  constructor(private store:Store, private router:ActivatedRoute){
    
  }



}
