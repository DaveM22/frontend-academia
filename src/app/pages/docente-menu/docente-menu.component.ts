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
import { GetNoLeidasCountAction } from '../../store/actions/api/notificacion.action';
import { environment } from '../../../environments/environment';
import { combineLatest, take, filter, interval, Observable, Subject } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-docente-menu',
  standalone: true,
  imports: [CommonModule, MenubarModule, ButtonModule, AvatarModule, MenuModule, BadgeModule],
  templateUrl: './docente-menu.component.html',
  styleUrl: './docente-menu.component.scss'
})
export class DocenteMenuComponent implements OnInit, OnDestroy {
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
    const docenteId = this.store.selectSnapshot(AppPageState.getPersonId);
    if (docenteId) {
      this.store.dispatch(new GetNoLeidasCountAction({ docenteId }));
      // Auto-refresh cada 30 segundos
      interval(30000)
        .pipe(
          switchMap(() => {
            this.store.dispatch(new GetNoLeidasCountAction({ docenteId }));
            return [];
          }),
          takeUntil(this.destroy$)
        )
        .subscribe();
    }
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
        this.userRole = (claims[environment.roleLogin] as string[])?.[0] || 'Docente';
        this.setupDocenteMenu();
        this.setupUserMenu();
      }
    });
  }

  private setupDocenteMenu() {
    const personaId = this.store.selectSnapshot(AppPageState.getPersonId);
    this.menuItems = [
      {
        label: 'Inicio',
        icon: 'pi pi-home',
        command: () => this.router.navigate(['docente/inicio'])
      },
      {
        label: 'Asignaciones',
        icon: 'pi pi-book',
        command: () => this.router.navigate(['docente/cursos-asignados'])
      },
      {
        label: 'Notificaciones',
        icon: 'pi pi-bell',
        command: () => this.router.navigate(['docente/notificaciones']),
        badge: (this.store.selectSnapshot(NotificacionState.getNoLeidasCount) || 0).toString()
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
