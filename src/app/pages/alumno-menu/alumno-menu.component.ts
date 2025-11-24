import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { Store } from '@ngxs/store';
import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';
import { MenuModule } from 'primeng/menu';
import { MenuItem } from 'primeng/api';
import { AppPageState } from '../../store/states/page/app.state';
import { environment } from '../../../environments/environment';
import { combineLatest, take, filter } from 'rxjs';

@Component({
  selector: 'app-alumno-menu',
  standalone: true,
  imports: [CommonModule, MenubarModule, ButtonModule, AvatarModule, MenuModule],
  templateUrl: './alumno-menu.component.html',
  styleUrl: './alumno-menu.component.scss'
})
export class AlumnoMenuComponent implements OnInit {
  menuItems: MenuItem[] = [];
  userMenuItems: MenuItem[] = [];
  userName: string = '';
  userPicture: string = '';
  userRole: string = '';
  mobileMenuVisible: boolean = false;

  constructor(
    private auth: AuthService,
    private store: Store,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.setupMenu();
  }

  private setupMenu() {
    combineLatest([
      this.auth.isAuthenticated$,
      this.auth.idTokenClaims$
    ]).pipe(
      take(1),
      filter(([isLogged, claims]) => isLogged && claims !== null)
    ).subscribe(([isLogged, claims]) => {
      if (claims) {
        this.userName = claims.name || '';
        this.userPicture = claims.picture || '';
        this.userRole = (claims[environment.roleLogin] as string[])?.[0] || 'Alumno';
        this.setupAlumnoMenu();
        this.setupUserMenu();
      }
    });
  }

  private setupAlumnoMenu() {
    const personaId = this.store.selectSnapshot(AppPageState.getPersonId);
    
    this.menuItems = [
      {
        label: 'Inicio',
        icon: 'pi pi-home',
        command: () => this.router.navigate(['alumno/inicio'])
      },
      {
        label: 'Mis cátedras',
        icon: 'pi pi-user',
        command: () => this.router.navigate(['alumno/catedras/' + personaId])
      },
      {
        label: 'Inscribirse a cátedra',
        icon: 'pi pi-plus-circle',
        command: () => this.router.navigate(['inscripcion-catedra/materias-disponibles/' + personaId])
      }
    ];
  }

  private setupUserMenu() {
    this.userMenuItems = [
      {
        label: 'Cerrar sesión',
        icon: 'pi pi-sign-out',
        command: () => this.logout()
      }
    ];
  }

  logout() {
    this.auth.logout();
  }

  toggleMobileMenu() {
    this.mobileMenuVisible = !this.mobileMenuVisible;
  }

  onMobileMenuClick(item: MenuItem) {
    if (item.command) {
      item.command({});
    }
    this.mobileMenuVisible = false;
  }

  onDesktopMenuClick(item: MenuItem) {
    if (item.command) {
      item.command({});
    }
  }
}
