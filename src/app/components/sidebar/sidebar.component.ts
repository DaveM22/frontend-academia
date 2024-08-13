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
import { SetPersonaId } from '../../store/actions/pages/app.action';
import { AppPageState } from '../../store/states/page/app.state';
@Component({
  selector: 'sidebar',
  standalone: true,
  imports: [MenuModule, SidebarModule, PanelMenuModule],
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
        this.rol = claims!["https://academia.com/roles"][0]
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
      { label: 'Alumnos', icon: 'pi pi pi-user', command: () => this.router.navigate(["/personas/alumnos/lista"]) },
      { label: 'Profesores', icon: 'pi pi pi-user', command: () => this.router.navigate(["/personas/profesores/lista"]) },
      { label: 'Especialidades', icon: 'pi pi-cog', command: () => this.router.navigate(["/especialidades/lista"]) },
      { label: 'Planes y materias', icon: 'pi pi-cog', command: () => this.router.navigate(["/planes/lista"]) },
      { label: 'Comisiones', icon: 'pi pi-cog', command: () => this.router.navigate(["/comisiones/lista"]) },
      { label: 'Cursos', icon: 'pi pi-cog', command: () => this.router.navigate(["/cursos/lista"]) },
      { label: 'Inscripciones de alumnos', icon: 'pi pi-cog', command: () => this.router.navigate(["/inscripciones-alumnos"]) },
      { label: 'Profesores en cursos', icon: 'pi pi-cog', command: () => this.router.navigate(["/asignacion-docentes/seleccionar-materia"]) },
      { label: 'Usuarios', icon: 'pi pi-cog', command: () => this.router.navigate(["/usuarios/lista"]) }
    ];
  }

  itemsAlumno() {
    let personaId = this.store.selectSnapshot(AppPageState.getPersonId);
    this.items = [
      { label: 'Mis catedras', icon: 'pi pi pi-user', command: () => this.router.navigate(["alumno/catedras/"+personaId]) },
      { label: 'Insribirse a catedra', icon: 'pi pi pi-user', command: () => this.router.navigate(["inscripcion-catedra/materias-disponibles/"+personaId]) },
    ]
  }

  itemsDocente(){
    let personaId = this.store.selectSnapshot(AppPageState.getPersonId);
    this.items = [
      { label: 'Catedras asignadas', icon: 'pi pi pi-user', command: () => this.router.navigate(["docente/"+personaId+"/cursos-asignados"]) },
    ]
  }



}
