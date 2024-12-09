import { Routes } from '@angular/router';
import { EspecialidadComponent } from './pages/especialidad/especialidad.component';
import { AppComponent } from './app.component';
import { PlanComponent } from './pages/plan/plan.component';
import { EspecialidadNuevoComponent } from './pages/especialidad-nuevo/especialidad-nuevo.component';
import { EspecialidadEditarComponent } from './pages/especialidad-editar/especialidad-editar.component';
import { PlanMateriasComponent } from './pages/plan-materias/plan-materias.component';
import { PlanEditarComponent } from './pages/plan-editar/plan-editar.component';
import { PlanNuevoComponent } from './pages/plan-nuevo/plan-nuevo.component';
import { PlanMateriasNuevoComponent } from './pages/plan-materias-nuevo/plan-materias-nuevo.component';
import { PlanMateriasEditarComponent } from './pages/plan-materias-editar/plan-materias-editar.component';
import { ComisionComponent } from './pages/comision/comision.component';
import { ApplayoutComponent } from './pages/applayout/applayout.component';
import { CursoComponent } from './pages/curso/curso.component';
import { CursoNuevoComponent } from './pages/curso-nuevo/curso-nuevo.component';
import { AlumnoComponent } from './pages/alumno/alumno.component';
import { ComisionNuevoComponent } from './pages/comision-nuevo/comision-nuevo.component';
import { ComisionEditarComponent } from './pages/comision-editar/comision-editar.component';
import { AlumnoNuevoComponent } from './pages/alumno-nuevo/alumno-nuevo.component';
import { ProfesorComponent } from './pages/profesor/profesor.component';
import { AlumnoEditarComponent } from './pages/alumno-editar/alumno-editar.component';
import { ProfesorEditarComponent } from './pages/profesor-editar/profesor-editar.component';
import { ProfesorNuevoComponent } from './pages/profesor-nuevo/profesor-nuevo.component';
import { InscripcionAlumnoComponent } from './pages/inscripcion-alumno/inscripcion-alumno.component';
import { InscripcionesComponent } from './pages/inscripciones/inscripciones.component';
import { InscripcionNuevoComponent } from './pages/inscripcion-nuevo/inscripcion-nuevo.component';
import { AsignacionProfesorComponent } from './pages/asignacion-profesor/asignacion-profesor.component';
import { MateriaCursosComponent } from './pages/materia-cursos/materia-cursos.component';
import { patch } from '@ngxs/store/operators';
import { MateriasAsignacionComponent } from './pages/materias-asignacion/materias-asignacion.component';
import { EspecialidadListaComponent } from './pages/especialidad-lista/especialidad-lista.component';
import { DocentesCursosComponent } from './pages/docentes-cursos/docentes-cursos.component';
import { DocentesCursosNuevoComponent } from './pages/docentes-cursos-nuevo/docentes-cursos-nuevo.component';
import { PlanListaComponent } from './pages/plan-lista/plan-lista.component';
import { AlumnoListaComponent } from './pages/alumno-lista/alumno-lista.component';
import { CursoListaComponent } from './pages/curso-lista/curso-lista.component';
import { ComisionListaComponent } from './pages/comision-lista/comision-lista.component';
import { ProfesorListaComponent } from './pages/profesor-lista/profesor-lista.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuard, authGuardFn } from '@auth0/auth0-angular';
import { CallbackComponent } from './pages/callback/callback.component';
import { adminGuard, alumnoGuard } from './admin.guard';
import { UsuarioComponent } from './pages/usuario/usuario.component';
import { UsuarioListaComponent } from './pages/usuario-lista/usuario-lista.component';
import { UsuarioNuevoComponent } from './pages/usuario-nuevo/usuario-nuevo.component';
import { UsuarioEditarComponent } from './pages/usuario-editar/usuario-editar.component';
import { CatedrasAlumnoComponent } from './pages/catedras-alumno/catedras-alumno.component';
import { InscripcionMateriaAlumnoComponent } from './pages/inscripcion-materia-alumno/inscripcion-materia-alumno.component';
import { CursosDisponiblesComponent } from './pages/cursos-disponibles/cursos-disponibles.component';
import { InscripcionMateriaAlumnoMateriasComponent } from './pages/inscripcion-materia-alumno-materias/inscripcion-materia-alumno-materias.component';
import { CatedrasDocenteComponent } from './pages/catedras-docente/catedras-docente.component';
import { CatedrasDocenteCursosComponent } from './pages/catedras-docente-cursos/catedras-docente-cursos.component';
import { CatedrasDocenteInscripcionesComponent } from './pages/catedras-docente-inscripciones/catedras-docente-inscripciones.component';
import { InscripcionAlumnoListaComponent } from './pages/inscripcion-alumno-lista/inscripcion-alumno-lista.component';

export const routes: Routes = [
    {
        path: '',
        component: ApplayoutComponent,
        canActivate: [AuthGuard],
        children: [
            {
                path: 'especialidades',
                component: EspecialidadComponent,
                children: [
                    { path: 'lista', pathMatch: 'full', component: EspecialidadListaComponent },
                    { path: 'nuevo', pathMatch: 'full', component: EspecialidadNuevoComponent },
                    { path: 'editar/:id', pathMatch: 'full', component: EspecialidadEditarComponent }
                ],
                canActivate: [AuthGuard, adminGuard],
                data: {
                    role: 'Administrador'
                }

            },
            {
                path: 'planes',
                component: PlanComponent,
                children: [
                    { path: 'lista', pathMatch: 'full', component: PlanListaComponent },
                    { path: 'nuevo', pathMatch: 'full', component: PlanNuevoComponent },
                    { path: 'editar/:id', pathMatch: 'full', component: PlanEditarComponent },
                    { path: ':id/materias', pathMatch: 'full', component: PlanMateriasComponent },
                    { path: ':id/materias/nuevo', component: PlanMateriasNuevoComponent },
                    { path: 'planes/:id/materias/editar/:idMateria', component: PlanMateriasEditarComponent }
                ],
                canActivate: [AuthGuard, adminGuard],
                data: {
                    role: 'Administrador'
                }
            },
            {
                path: 'comisiones',
                component: ComisionComponent,
                children: [
                    { path: 'lista', component: ComisionListaComponent },
                    { path: 'nuevo', component: ComisionNuevoComponent },
                    { path: 'editar/:id', component: ComisionEditarComponent }
                ],
                canActivate: [AuthGuard, adminGuard],
                data: {
                    role: 'Administrador'
                }
            },
            {
                path: 'cursos',
                component: CursoComponent,
                children: [
                    { path: 'lista', component: CursoListaComponent },
                    { path: 'nuevo', component: CursoNuevoComponent }
                ],
                canActivate: [AuthGuard, adminGuard],
                data: {
                    role: 'Administrador'
                }
            },
            {
                path: 'alumnos',
                component: AlumnoComponent,
                children: [
                    { path: 'lista', component: AlumnoListaComponent },
                    { path: 'nuevo', component: AlumnoNuevoComponent },
                    { path: 'editar/:id', component: AlumnoEditarComponent }
                ],
                canActivate: [AuthGuard, adminGuard],
                data: {
                    role: 'Administrador'
                }
            },
            {
                path: 'profesores',
                component: ProfesorComponent,
                children: [
                    { path: 'lista', pathMatch: 'full', component: ProfesorListaComponent },
                    { path: 'nuevo', pathMatch: 'full', component: ProfesorNuevoComponent },
                    { path: 'editar/:id', pathMatch: 'full', component: ProfesorEditarComponent }
                ],
                canActivate: [AuthGuard, adminGuard],
                data: {
                    role: 'Administrador'
                }
            },
            {
                path: 'inscripciones/alumnos',
                component: InscripcionAlumnoComponent,
                children: [
                    {
                        path:'lista',
                        component:InscripcionAlumnoListaComponent
                    },
                    {
                        path: ':id',
                        component: InscripcionesComponent
                    },

                    {
                        path: ':id/nuevo',
                        component: InscripcionNuevoComponent
                    },
                ],
                canActivate: [AuthGuard, adminGuard],
                data: {
                    role: 'Administrador'
                }
            },

            {
                path: 'alumno/catedras/:id',
                component: CatedrasAlumnoComponent
            },
            {
                path: 'docente/:id',
                component: CatedrasDocenteComponent,
                children: [
                    { path: 'cursos-asignados', component: CatedrasDocenteCursosComponent },
                    { path: 'cursos-inscripciones/:idCurso', component: CatedrasDocenteInscripcionesComponent }
                ],
                canActivate: [AuthGuard, adminGuard],
                data: {
                    role: 'Administrador'
                }
            },
            {
                path: 'inscripcion-catedra',
                component: InscripcionMateriaAlumnoComponent,
                children: [
                    { path: 'materias-disponibles/:id', component: InscripcionMateriaAlumnoMateriasComponent },
                    { path: 'cursos-disponibles/:id', component: CursosDisponiblesComponent }
                ],
                canActivate: [AuthGuard, alumnoGuard],
                data: {
                    role: 'Alumno'
                }
            },
            {
                path: 'usuarios',
                component: UsuarioComponent,
                children: [
                    { path: 'lista', component: UsuarioListaComponent },
                    { path: 'nuevo', component: UsuarioNuevoComponent },
                    { path: 'editar/:id', component: UsuarioEditarComponent }
                ],
                canActivate: [AuthGuard, adminGuard],
            },
            {
                path: 'asignacion-docentes',
                component: AsignacionProfesorComponent,
                children: [
                    { path: 'seleccionar-materia', pathMatch: 'full', component: MateriasAsignacionComponent },
                    { path: ':id/seleccionar-curso', pathMatch: 'full', component: MateriaCursosComponent },
                    { path: ':idMateria/:idCurso/docentes', pathMatch: 'full', component: DocentesCursosComponent },
                    { path: ':idMateria/:idCurso/docentes/nuevo', pathMatch: 'full', component: DocentesCursosNuevoComponent }
                ],
                canActivate: [AuthGuard, adminGuard],
                data: {
                    role: 'Administrador'
                }
            },
        ]
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'callback',
        component: CallbackComponent
    }


];
