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

export const routes: Routes = [
    {
        path: '',
        component: ApplayoutComponent,
        children: [
            {
                path: 'especialidades',
                component: EspecialidadComponent,
                children: [
                    { path: 'lista', pathMatch: 'full', component: EspecialidadListaComponent },
                    { path: 'nuevo', pathMatch: 'full', component: EspecialidadNuevoComponent },
                    { path: 'editar/:id', pathMatch: 'full', component: EspecialidadEditarComponent }
                ]
            },
            {
                path: 'planes',
                component: PlanComponent
            },
            {
                path: 'planes/nuevo',
                component: PlanNuevoComponent
            },
            {
                path: 'planes/editar/:id',
                component: PlanEditarComponent
            },
            {
                path: 'planes/:id/materias',
                component: PlanMateriasComponent
            },
            {
                path: 'planes/:id/materias/nuevo',
                component: PlanMateriasNuevoComponent
            },
            {
                path: 'planes/:id/materias/editar/:idMateria',
                component: PlanMateriasEditarComponent
            },
            {
                path: 'comisiones',
                component: ComisionComponent
            },
            {
                path: 'comisiones/nuevo',
                component: ComisionNuevoComponent
            },
            {
                path: 'comisiones/editar/:id',
                component: ComisionEditarComponent
            },
            {
                path: 'cursos',
                component: CursoComponent,
            },
            {
                path: 'cursos/nuevo',
                component: CursoNuevoComponent
            },
            {
                path: 'personas/alumnos',
                component: AlumnoComponent
            },
            {
                path: 'personas/alumnos/nuevo',
                component: AlumnoNuevoComponent
            },
            {
                path: 'personas/alumnos/editar/:id',
                component: AlumnoEditarComponent
            },
            {
                path: 'personas/profesores',
                component: ProfesorComponent
            },
            {
                path: 'personas/profesores/nuevo',
                component: ProfesorNuevoComponent
            },
            {
                path: 'personas/profesores/editar/:id',
                component: ProfesorEditarComponent
            },
            {
                path: 'inscripciones-alumnos',
                component: InscripcionAlumnoComponent
            },
            {
                path: 'inscripciones/:id',
                component: InscripcionesComponent
            },
            {
                path: 'inscripciones/:id/nuevo',
                component: InscripcionNuevoComponent
            },
            {
                path: 'asignacion-docentes',
                component: AsignacionProfesorComponent,
                children: [
                    { path: 'seleccionar-materia', pathMatch: 'full', component: MateriasAsignacionComponent },
                    { path: ':id/seleccionar-curso', pathMatch: 'full', component: MateriaCursosComponent },
                    { path:':idMateria/:idCurso/docentes', pathMatch:'full', component:DocentesCursosComponent },
                    { path:':idMateria/:idCurso/docentes/nuevo', pathMatch:'full', component:DocentesCursosNuevoComponent}
                ]
            },
        ]
    }


];
