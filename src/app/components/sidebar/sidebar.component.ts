import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { Menu, MenuModule } from 'primeng/menu';
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
import { combineLatest } from 'rxjs';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
@Component({
  selector: 'sidebar',
  standalone: true,
  imports: [MenuModule, DrawerModule, PanelMenuModule, AvatarModule, ButtonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent implements OnInit {
  @ViewChild('menu') menu!: Menu;
  items: MenuItem[] | undefined;
  userMenuItems: MenuItem[] | undefined;
  sidebarVisible: boolean = true;
  rol: string = '';
  isLogged: boolean = false;
  picture: string = '';
  name: string = '';
  constructor(private store: Store, private router: Router, private auth: AuthService) { }



  async ngOnInit(): Promise<void> {
    this.userMenuItems = [
      {
        label: 'Cerrar Sesión',
        icon: 'pi pi-power-off',
        command: (event) => {
          if (event.originalEvent) {
            event.originalEvent.stopPropagation();
          }
          this.logout();
        }
      }
    ];

    combineLatest([
      this.auth.isAuthenticated$,
      this.auth.idTokenClaims$
    ]).pipe(take(1)).subscribe(([isLogged, claims]) => {
      this.isLogged = isLogged;
      if (claims) {
        this.store.dispatch(new SetPersonaId(claims["personaId"]));
        this.rol = claims[environment.roleLogin][0];
        this.picture = claims.picture || '';
        this.name = claims.name || '';
        this.renderItems(this.rol);
      }
    });
  }

  logout() {
    this.auth.logout();
  }

  toggleUserMenu(event: Event) {
    event.stopPropagation();
    this.menu.toggle(event);
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
        label: 'Personal',
        items: [
          { label: 'Alumnos', styleClass: 'text-sm lg:text-lg', icon: 'pi pi pi-user', command: () => this.navigate("/alumnos/lista") },
          { label: 'Profesores', styleClass: 'text-sm lg:text-lg', icon: 'pi pi pi-user', command: () => this.navigate("/profesores/lista") },
          { label: 'Usuarios', styleClass: 'text-sm lg:text-lg', icon: 'pi pi pi-user', command: () => this.navigate("/usuarios/lista") }
        ],
        styleClass: 'text-sm lg:text-lg'
      },
      {
        label: 'Alumnado',
        items: [
          { label: 'Especialidades', styleClass: 'text-sm lg:text-lg', icon: 'pi pi-cog', command: () => this.navigate("/especialidades/lista") },
          { label: 'Planes y materias', styleClass: 'text-sm lg:text-lg', icon: 'pi pi-cog', command: () => this.navigate("/planes/lista") },
          { label: 'Comisiones', styleClass: 'text-sm lg:text-lg', icon: 'pi pi-cog', command: () => this.navigate("/comisiones/lista") },
          { label: 'Cursos', styleClass: 'text-sm lg:text-lg', icon: 'pi pi-cog', command: () => this.navigate("/cursos/lista") },
        ],
        styleClass: 'text-sm lg:text-lg'
      },

      {
        label: 'Inscripciones',
        items: [
          { label: 'Inscripciones de alumnos', styleClass: 'text-sm lg:text-lg', icon: 'pi pi-pen-to-square', command: () => this.navigate("inscripciones/alumnos/lista") },
          { label: 'Profesores en cursos', styleClass: 'text-sm lg:text-lg', icon: 'pi pi-pen-to-square', command: () => this.navigate("/asignacion-docentes/seleccionar-materia") },
        ],
        styleClass: 'text-sm lg:text-lg'
      },
      {
        label: 'Configuraciones',
        items: [
          { label: 'Parametros', styleClass: 'text-sm lg:text-lg', icon: 'pi pi-cog', command: () => this.navigate("/parametros/lista") }
        ]
      }


    ];
  }

  itemsAlumno() {
    let personaId = this.store.selectSnapshot(AppPageState.getPersonId);
    this.items = [
      {
        label: 'Alumno',
        items: [
          { label: 'Mis catedras', styleClass: 'text-sm lg:text-lg', icon: 'pi pi pi-user', command: () => this.router.navigate(["alumno/catedras/" + personaId]) },
          { label: 'Insribirse a cátedra', styleClass: 'text-sm lg:text-lg', icon: 'pi pi pi-user', command: () => this.router.navigate(["inscripcion-catedra/materias-disponibles/" + personaId]) }
        ]
      }
    ]
  }


  navigate(url: string) {
    this.router.navigate([url]);
    this.store.dispatch(new ToggleMenuAction(false));
  }

  itemsDocente() {
    let personaId = this.store.selectSnapshot(AppPageState.getPersonId);
    this.items = [
      {
        label: 'Docente',
        items: [
          { label: 'Mis cátedras', styleClass: 'text-sm lg:text-lg', icon: 'pi pi pi-user', command: () => this.router.navigate(["docente/" + personaId + "/cursos-asignados"]) },
        ]
      }
    ]
  }



}
