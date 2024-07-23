import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Comision } from '../../entities/comision';
import { ComisionFilter } from '../../entities/filter';
import { ComisionState } from '../../store/states/api/comision.state';
import { GetComision } from '../../store/actions/api/comision.action';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { MessagesModule } from 'primeng/messages';
import { PanelModule } from 'primeng/panel';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-comision-lista',
  standalone: true,
  imports: [CommonModule, TableModule, ButtonModule, MessagesModule, PanelModule, ToastModule],
  templateUrl: './comision-lista.component.html',
  styleUrl: './comision-lista.component.scss'
})
export class ComisionListaComponent implements OnInit {

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
    this.store.dispatch(new GetComision(filters));

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
