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

export const routes: Routes = [
    {
        path:'',
        component:ApplayoutComponent,
        children:[
            {
                path:'especialidades',
                component:EspecialidadComponent,
            },
            {
                path:'especialidades/nuevo',
                component:EspecialidadNuevoComponent
            },
            {
                path:'especialidades/nuevo',
                component:EspecialidadNuevoComponent
            },
            {
                path:'especialidades/editar/:id',
                component:EspecialidadEditarComponent
            },
            {
                path:'planes',
                component:PlanComponent
            },
            {
                path:'planes/nuevo',
                component:PlanNuevoComponent
            },
            {
                path:'planes/editar/:id',
                component:PlanEditarComponent
            },
            {
                path:'planes/:id/materias',
                component:PlanMateriasComponent
            },
            {
                path:'planes/:id/materias/nuevo',
                component:PlanMateriasNuevoComponent
            },
            {
                path:'planes/:id/materias/editar/:idMateria',
                component:PlanMateriasEditarComponent
            },
            {
                path:'comisiones',
                component: ComisionComponent
            }
        ]
    }


];
