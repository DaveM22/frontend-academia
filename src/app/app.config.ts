import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideStore } from '@ngxs/store';
import { EspecialidadState } from './store/states/api/especialidad.state';
import { provideHttpClient, withInterceptors, withInterceptorsFromDi, HTTP_INTERCEPTORS } from '@angular/common/http';

import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { EspecialidadPageState } from './store/states/page/especialidad.state';
import { PlanState } from './store/states/api/plan.state';
import { PlanPageState } from './store/states/page/plan.page.state';
import { MateriaPageState } from './store/states/page/materia.page.state';
import { MateriaState } from './store/states/api/materia.state';
import { AppPageState } from './store/states/page/app.state';
import { MessageService } from 'primeng/api';
import { CursoState } from './store/states/api/curso.state';
import { CursoPageState } from './store/states/page/curso.state';
import { PersonaState } from './store/states/api/persona.state';
import { ComisionState } from './store/states/api/comision.state';
import { ComisionPageState as ComisionPageState } from './store/states/page/comision.state';
import { PersonaPageState } from './store/states/page/persona.state';
import { AlumnoInscripcionState } from './store/states/api/alumno-incripcion.state';
import { DocenteCursoState } from './store/states/api/docente-curso.state';
import { authHttpInterceptorFn, AuthModule, provideAuth0 } from '@auth0/auth0-angular';
import { UsuarioState } from './store/states/api/usuario.state';
import { UsuarioPageState } from './store/states/page/usuario.state';
import { environment } from '../environments/environment';
import { AlumnoInscripcionPageState } from './store/states/page/alumno-inscripcion.state';
import { InputNumber } from 'primeng/inputnumber';
import { providePrimeNG } from 'primeng/config';
import { withNgxsLoggerPlugin } from '@ngxs/logger-plugin';
import Material from '@primeng/themes/material';
import { definePreset } from '@primeng/themes';
import { MyPreset } from './mypreset';
import { style } from '@angular/animations';
import { Parametro } from './entities/parametro';
import { ParametroState } from './store/states/api/parametro.state';
import { NotificacionState } from './store/states/api/notificacion.state';
import { DashboardState } from './store/states/api/dashboard.state';
import { DashboardProfesorState } from './store/states/api/dashboard-profesor.state';

// MyPreset imported from mypreset.ts

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    MessageService,
    provideHttpClient(withInterceptors([authHttpInterceptorFn])),
    provideAnimationsAsync(),
    providePrimeNG({
        theme: {
            preset: MyPreset,
            options: {
              prefix: 'p',
              darkModeSelector: 'system',
              cssLayer: {
                name: 'primeng',
                order: 'tailwind, theme, base, primeng'
            }
            }
        }
    }),
    withNgxsLoggerPlugin(),
    provideAuth0({
      domain: 'dev-20at530bk6073fra.us.auth0.com',
      clientId: 'KnOM8qladHYWB4bFbKNLHdNDDVQn9GFP',
      authorizationParams: {
        redirect_uri: window.location.origin,
        audience:environment.audicence
      }, 
      useRefreshTokens:true,
      cacheLocation:'memory',
      httpInterceptor:{
        allowedList:[
          {
            uri:`${environment.apiUrl}/*`,
            tokenOptions:{
              authorizationParams:{
                audience:environment.audicence
              }
            }
          }
        ]
      }
    },
  ),
    provideStore(
      [
        AppPageState,
        AlumnoInscripcionState,
        EspecialidadState, 
        EspecialidadPageState,
        MateriaState,
        MateriaPageState, 
        PlanState, 
        PlanPageState,
        CursoState,
        CursoPageState,
        PersonaState,
        PersonaPageState,
        ComisionState,
        ComisionPageState,
        DocenteCursoState,
        UsuarioState,
        UsuarioPageState,
        AlumnoInscripcionPageState,
        ParametroState,
        NotificacionState,
        DashboardState,
        DashboardProfesorState
      ], { developmentMode: !environment.production}),
      
],

};
