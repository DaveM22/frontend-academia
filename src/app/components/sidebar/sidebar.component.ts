import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { MenuModule } from 'primeng/menu';
import { SidebarModule } from 'primeng/sidebar';
import { PanelMenuModule } from 'primeng/panelmenu';
import { RolService } from '../../services/rol.service';
import { AuthService } from '@auth0/auth0-angular';
import { lastValueFrom, map, take, tap } from 'rxjs';
import { RolesUsuario } from '../../entities/enums';
import { Store } from '@ngxs/store';
import { SetPersonaId, ToggleMenuAction } from '../../store/actions/pages/app.action';
import { AppPageState } from '../../store/states/page/app.state';
import { environment } from '../../../environments/environment';
import { DrawerModule } from 'primeng/drawer';
@Component({
  selector: 'sidebar',
  standalone: true,
  imports: [MenuModule, DrawerModule, PanelMenuModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent implements OnInit {
  items: MenuItem[] | undefined;
  sidebarVisible: boolean = true;
  rol: string = '';
  isLogged: boolean = false;
  constructor(private store:Store,private router: Router, private auth: AuthService) { }



  async ngOnInit(): Promise<void> {
    this.auth.isAuthenticated$.subscribe(x => {
      this.isLogged = x;
      this.auth.idTokenClaims$.subscribe(claims => {
        this.store.dispatch(new SetPersonaId(claims!["personaId"]));
        this.rol = claims![environment.roleLogin][0]
        this.renderItems(this.rol);
      })
    })

  }

  renderItems(rol: string) {
    switch (rol) {
      case RolesUsuario.Administrador.toString():
        this.itemsAdministrador();
        break;
      case RolesUsuario.Alumno.toString():
        this.itemsAlumno();
        break;
      case RolesUsuario.Docente.toString():
        this.itemsDocente();
        break;
      default:
        break;
    }
  }

  itemsAdministrador() {
    this.items = [
      {
        label:'Personal',
        items:[
          { label: 'Alumnos',styleClass:'lg:text-sm', icon: 'pi pi pi-user', command: () => this.navigate("/alumnos/lista") },
          { label: 'Profesores',styleClass:'lg:text-sm', icon: 'pi pi pi-user', command: () => this.navigate("/profesores/lista") },
          { label: 'Usuarios',styleClass:'lg:text-sm', icon: 'pi pi pi-user', command: () => this.navigate("/usuarios/lista") }
        ]
      },
      {
        label:'Alumnado',
        items:[
          { label: 'Especialidades',styleClass:'lg:text-sm', icon: 'pi pi-cog', command: () => this.navigate("/especialidades/lista") },
          { label: 'Planes y materias',styleClass:'lg:text-sm', icon: 'pi pi-cog', command: () => this.navigate("/planes/lista") },
          { label: 'Comisiones',styleClass:'lg:text-sm', icon: 'pi pi-cog', command: () => this.navigate("/comisiones/lista") },
          { label: 'Cursos',styleClass:'lg:text-sm', icon: 'pi pi-cog', command: () => this.navigate("/cursos/lista") },
        ]
      },

      {
        label:'Inscripciones',
        items:[
          { label: 'Inscripciones de alumnos',styleClass:'lg:text-sm', icon: 'pi pi-pen-to-square', command: () => this.navigate("inscripciones/alumnos/lista") },
          { label: 'Profesores en cursos',styleClass:'lg:text-sm', icon: 'pi pi-pen-to-square', command: () => this.navigate("/asignacion-docentes/seleccionar-materia") },
        ]

      },
    {
      label:'Configuraciones',
      items:[
        {label:'Parametros',styleClass:'lg:text-sm', icon:'pi pi-cog', command: () => this.navigate("/parametros")}
      ]
    }


    ];
  }

  itemsAlumno() {
    let personaId = this.store.selectSnapshot(AppPageState.getPersonId);
    this.items = [
      { label: 'Mis catedras', icon: 'pi pi pi-user', command: () => this.router.navigate(["alumno/catedras/"+personaId]) },
      { label: 'Insribirse a catedra', icon: 'pi pi pi-user', command: () => this.router.navigate(["inscripcion-catedra/materias-disponibles/"+personaId]) },
    ]
  }
  

  navigate(url:string){
    this.router.navigate([url]); 
    this.store.dispatch(new ToggleMenuAction(false));
  }

  itemsDocente(){
    let personaId = this.store.selectSnapshot(AppPageState.getPersonId);
    this.items = [
      { label: 'Catedras asignadas', icon: 'pi pi pi-user', command: () => this.router.navigate(["docente/"+personaId+"/cursos-asignados"]) },
    ]
  }



}
