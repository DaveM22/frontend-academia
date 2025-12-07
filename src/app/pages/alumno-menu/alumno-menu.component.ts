import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { Store } from '@ngxs/store';
import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';
import { MenuModule } from 'primeng/menu';
import { BadgeModule } from 'primeng/badge';
import { MenuItem } from 'primeng/api';
import { AppPageState } from '../../store/states/page/app.state';
import { NotificacionState } from '../../store/states/api/notificacion.state';
import { GetNoLeidasCountAlumnoAction } from '../../store/actions/api/notificacion.action';
import { SetPersonaId } from '../../store/actions/pages/app.action';
import { environment } from '../../../environments/environment';
import { combineLatest, take, filter, interval, Observable, Subject } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-alumno-menu',
  standalone: true,
  imports: [CommonModule, MenubarModule, ButtonModule, AvatarModule, MenuModule, BadgeModule],
  templateUrl: './alumno-menu.component.html',
  styleUrl: './alumno-menu.component.scss'
})
export class AlumnoMenuComponent implements OnInit, OnDestroy {
  menuItems: MenuItem[] = [];
  userMenuItems: MenuItem[] = [];
  userName: string = '';
  userPicture: string = '';
  userRole: string = '';
  mobileMenuVisible: boolean = false;
  notificacionesCount$: Observable<number>;

  private destroy$ = new Subject<void>();

  constructor(
    private auth: AuthService,
    private store: Store,
    private router: Router
  ) {
    this.notificacionesCount$ = this.store.select(NotificacionState.getNoLeidasCount);
  }

  ngOnInit(): void {
    this.setupMenu();
    
    // Obtener personId de Auth0 y establecerlo en el store
    combineLatest([
      this.auth.isAuthenticated$,
      this.auth.idTokenClaims$
    ]).pipe(
      take(1),
      filter(([isLogged, claims]) => isLogged && claims !== null)
    ).subscribe(([isLogged, claims]) => {
      if (claims) {
        const personaId = claims["personaId"];
        if (personaId) {
          this.store.dispatch(new SetPersonaId(personaId));
          this.store.dispatch(new GetNoLeidasCountAlumnoAction({ alumnoId: personaId }));
          
          // Auto-refresh cada 30 segundos
          interval(30000)
            .pipe(
              switchMap(() => {
                this.store.dispatch(new GetNoLeidasCountAlumnoAction({ alumnoId: personaId }));
                return [];
              }),
              takeUntil(this.destroy$)
            )
            .subscribe();
        }
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
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
    this.menuItems = [
      {
        label: 'Inicio',
        icon: 'pi pi-home',
        command: () => this.router.navigate(['alumno/inicio'])
      },
      {
        label: 'Mis cátedras',
        icon: 'pi pi-user',
        command: () => this.router.navigate(['alumno/catedras'])
      },
      {
        label: 'Inscribirse a cátedra',
        icon: 'pi pi-plus-circle',
        command: () => this.router.navigate(['inscripcion-catedra/materias-disponibles'])
      },
      {
        label: 'Novedades',
        icon: 'pi pi-bell',
        command: () => this.router.navigate(['alumno/novedades'])
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
