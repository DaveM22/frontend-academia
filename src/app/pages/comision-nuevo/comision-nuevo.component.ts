import { Component } from '@angular/core';
import { Comision } from '../../entities/comision';
import { AsignComisionAction } from '../../store/actions/pages/comision.action';
import { Store } from '@ngxs/store';
import { ComisionFormComponent } from '../../components/forms/comision-form/comision-form.component';

@Component({
  selector: 'app-comision-nuevo',
  standalone: true,
  imports: [ComisionFormComponent],
  templateUrl: './comision-nuevo.component.html',
  styleUrl: './comision-nuevo.component.scss'
})
export class ComisionNuevoComponent {
  constructor(private store:Store){}
  
  ngOnInit(): void {
    this.store.dispatch(new AsignComisionAction(new Comision()));
  }


}
