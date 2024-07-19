import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { withNgxsLoggerPlugin } from '@ngxs/logger-plugin';
import { routes } from './app.routes';
import { provideStore } from '@ngxs/store';
import { EspecialidadState } from './store/states/api/especialidad.state';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
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
export const appConfig: ApplicationConfig = {
  
  providers: [provideZoneChangeDetection({ eventCoalescing: true })

    , provideRouter(routes), 
    MessageService,
    provideHttpClient(withInterceptorsFromDi()),
    provideAnimationsAsync(),
    withNgxsLoggerPlugin(),
    
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
        DocenteCursoState
      ], { developmentMode: true})]
};
