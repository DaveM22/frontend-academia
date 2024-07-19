import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Comision } from '../../entities/comision';
import { Store } from '@ngxs/store';
import { Router } from '@angular/router';
import { ComisionState } from '../../store/states/api/comision.state';
import { GetComision as GetComisionAction } from '../../store/actions/api/comision.action';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { MessagesModule } from 'primeng/messages';
import { PanelModule } from 'primeng/panel';
import { ToastModule } from 'primeng/toast';
import { ComisionFilter } from '../../entities/filter';

@Component({
  selector: 'app-comision',
  standalone: true,
  imports: [CommonModule, TableModule, ButtonModule, MessagesModule, PanelModule, ToastModule],
  templateUrl: './comision.component.html',
  styleUrl: './comision.component.scss'
})
export class ComisionComponent {

  public comisiones$: Observable<Comision[]> = this.store.select(ComisionState.getComisiones)

  public loading$:Observable<boolean> = this.store.select(ComisionState.getLoading);

  public error$:Observable<boolean> = this.store.select(ComisionState.getError);

  public errorMessage$:Observable<string> = this.store.select(ComisionState.getErrorMessage);

  public Comision!:Comision;
  constructor(private store:Store, private router:Router){
    
  }


  ngOnInit(): void {
    let filters = new ComisionFilter();
    filters.mostrarPlan = true;
    this.store.dispatch(new GetComisionAction(filters));

  }


/*   showModal(esp:Comision){
    this.Comision = esp;
    this.store.dispatch(new ShowModalDeleteAction(true));
  }
 */
  redirectNuevaComision(){
    this.router.navigate(["/comisiones/nuevo"]);
  }

  redirectEditarComision(id:string){
    this.router.navigate(["/comisiones/editar/" + id])
  }

  Comisiones!: Comision[];
  title = 'academia';
}
