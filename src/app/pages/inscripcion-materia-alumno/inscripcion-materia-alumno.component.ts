import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { MessagesModule } from 'primeng/messages';
import { TableModule } from 'primeng/table';
import { ToolbarModule } from 'primeng/toolbar';
import { EspecialidadFilterComponent } from '../../components/filters/especialidad-filter/especialidad-filter.component';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Alumno } from '../../entities/alumno';
import { AlumnoInscripcion } from '../../entities/alumno-inscripcion';
import { AlumnoFilter, MateriaFilter } from '../../entities/filter';
import { GetAlumnoByIdAction } from '../../store/actions/api/persona.action';
import { AppPageState } from '../../store/states/page/app.state';
import { PersonaPageState } from '../../store/states/page/persona.state';
import { GetByIdForInscripcion } from '../../store/actions/api/materia.action';
import { MateriaState } from '../../store/states/api/materia.state';
import { Materia } from '../../entities/materia';
import { RouterModule } from '@angular/router';
import { PanelModule } from 'primeng/panel';
import { CardModule } from 'primeng/card';
import { ParametroState } from '../../store/states/api/parametro.state';
import { Parametro } from '../../entities/parametro';
import { MessageModule } from 'primeng/message';
import { GetByNombreParametroAction } from '../../store/actions/api/parametros.action';
import { BlockUiComponent } from '../../components/util/block-ui/block-ui.component';
import { BlockUiGeneralComponent } from '../../components/util/block-ui-general/block-ui-general.component';
import { GeneralLoadingAction } from '../../store/actions/pages/app.action';
import { filter, distinctUntilChanged } from 'rxjs';
@Component({
  selector: 'app-inscripcion-materia-alumno',
  standalone: true,
  imports: [CommonModule,RouterModule, PanelModule, CardModule, MessageModule,  BlockUiGeneralComponent],
  templateUrl: './inscripcion-materia-alumno.component.html',
  styleUrl: './inscripcion-materia-alumno.component.scss'
})
export class InscripcionMateriaAlumnoComponent implements OnInit {
    public parametro$:Observable<Parametro | null> = this.store.select(ParametroState.getParameterSelected);

    public loading$:Observable<boolean> = this.store.select(ParametroState.getLoading);

    public generalLoading$:Observable<boolean> = this.store.select(AppPageState.getGeneralLoading);

    constructor(private store:Store)
    {}


  ngOnInit(): void {
   this.store.dispatch(new GetByNombreParametroAction('HabilitarInscripciones'));

   

   this.loading$
     .pipe(
       filter(x => x === false),
       distinctUntilChanged()
     )
     .subscribe(() => {
       this.store.dispatch(new GeneralLoadingAction(false));
     });
  }
}
