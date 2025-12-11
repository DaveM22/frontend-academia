import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { MessagesModule } from 'primeng/messages';
import { PanelModule } from 'primeng/panel';
import { TableModule } from 'primeng/table';
import { EspecialidadBorrarComponent } from '../especialidad-borrar/especialidad-borrar.component';
import { Observable } from 'rxjs';
import { Store } from '@ngxs/store';
import { UsuarioState } from '../../store/states/api/usuario.state';
import { Usuario } from '../../entities/usuario';
import { DeleteUsuarioAction, GetUsuarioListaAction } from '../../store/actions/api/usuarios.action';
import { Router } from '@angular/router';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { AppPageState } from '../../store/states/page/app.state';
import { ShowModalConfirmationAction } from '../../store/actions/pages/app.action';
import { ConfirmationService, MessageService } from 'primeng/api';
import { MessageModule } from 'primeng/message';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { BlockUiComponent } from '../../components/util/block-ui/block-ui.component';
import { MobileSortSelectComponent, SortOption } from '../../components/util/mobile-sort-select/mobile-sort-select.component';

@Component({
  selector: 'app-usuario-lista',
  standalone: true,
  imports: [CommonModule, TableModule, ButtonModule,ConfirmDialogModule, MessageModule, PanelModule, IconFieldModule, InputTextModule, InputIconModule, ProgressSpinnerModule, MobileSortSelectComponent],
  templateUrl: './usuario-lista.component.html',
  styleUrl: './usuario-lista.component.scss',
  providers:[ConfirmationService]
})
export class UsuarioListaComponent implements OnInit {
  usuarios: Usuario[] = [];
  usuarios$:Observable<Usuario[]> = this.store.select(UsuarioState.getUsuarios) 
  loading$:Observable<boolean> = this.store.select(UsuarioState.getLoading);
  error$:Observable<boolean> = this.store.select(UsuarioState.getError);
  errorMessage$:Observable<string> = this.store.select(UsuarioState.getErrorMessage)
  usuarioSelected$!:Usuario;
  sortOptions: SortOption[] = [
    { label: 'Usuario', field: 'nombreUsuario' },
    { label: 'Nombre y Apellido', field: 'nombreYapellido' }
  ];
 showConfirmation$: Observable<boolean> = this.store.select(AppPageState.showModalConfirmation)
  constructor(private store:Store, private router:Router, private messageService: MessageService,  private confirmationService: ConfirmationService){}


  ngOnInit(): void {
    this.usuarios$.subscribe(x => this.usuarios = x ? [...x] : []);
    this.showConfirmation$.subscribe(x => {
      if (x && this.usuarioSelected$) {
        this.confirm();
      }
    })
    this.store.dispatch(new GetUsuarioListaAction());
  }

  redirigirEditarUsuario(id:string){
    this.router.navigate([`usuarios/editar/${id}`]);
  }

  redirigirNuevoUsuario(){
    this.router.navigate([`usuarios/nuevo`]);
  }

    confirm() {
      this.confirmationService.confirm({
        header: 'Borrar profesor',
        message: `¿Desea eliminar el siguiente usuario: ${this.usuarioSelected$.nombreUsuario}  ?`,
        acceptIcon: 'pi pi-check mr-2',
        rejectIcon: 'pi pi-times mr-2',
        rejectButtonStyleClass: 'p-button-sm',
        acceptButtonStyleClass: 'p-button-outlined p-button-sm',
        accept: () => {
          this.store.dispatch(new DeleteUsuarioAction(this.usuarioSelected$._id))
            .subscribe(() => {
              this.store.dispatch(new ShowModalConfirmationAction(false))
              this.messageService.add({ severity: 'success', summary: 'Borrar profesor', detail: `Se ha borrado el usuario` });
            })
        },
        reject: () => {
          this.store.dispatch(new ShowModalConfirmationAction(false))
        }
      });
    }
  
      modalConfirmar(usuario:Usuario){
        this.usuarioSelected$= usuario;
        this.store.dispatch(new ShowModalConfirmationAction(true));
      }

}
