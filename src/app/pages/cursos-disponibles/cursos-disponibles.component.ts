import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { MessagesModule } from 'primeng/messages';
import { TableModule } from 'primeng/table';
import { ToolbarModule } from 'primeng/toolbar';
import { EspecialidadFilterComponent } from '../../components/filters/especialidad-filter/especialidad-filter.component';
import { Store } from '@ngxs/store';
import { AlumnoFilter, CursoFilter } from '../../entities/filter';
import { GetAlumnoByIdAction, PostAlumnoAction } from '../../store/actions/api/persona.action';
import { firstValueFrom, lastValueFrom, Observable } from 'rxjs';
import { filter, take } from 'rxjs/operators';
import { Alumno } from '../../entities/alumno';
import { AppPageState } from '../../store/states/page/app.state';
import { PersonaPageState } from '../../store/states/page/persona.state';
import { ActivatedRoute, Router } from '@angular/router';
import { ClearCursos, GetCursoAction } from '../../store/actions/api/curso.action';
import { CursoState } from '../../store/states/api/curso.state';
import { Curso } from '../../entities/curso';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ShowModalConfirmationAction } from '../../store/actions/pages/app.action';
import { AlumnoInscripcion, AlumnoInscripcionDto } from '../../entities/alumno-inscripcion';
import { PostAlumnoInscripcionAction } from '../../store/actions/api/alumno-inscripcion.action';
import { Condicion } from '../../entities/enums';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { BlockUiComponent } from '../../components/util/block-ui/block-ui.component';
import { MobileSortSelectComponent, SortOption } from '../../components/util/mobile-sort-select/mobile-sort-select.component';

@Component({
  selector: 'app-cursos-disponibles',
  standalone: true,
  imports: [CommonModule,ConfirmDialogModule,ToolbarModule, TableModule, ButtonModule, IconFieldModule, InputIconModule, MessagesModule, InputTextModule, ProgressSpinnerModule, MobileSortSelectComponent],
  templateUrl: './cursos-disponibles.component.html',
  styleUrl: './cursos-disponibles.component.scss',
  providers:[ConfirmationService]
})
export class CursosDisponiblesComponent implements OnInit, OnDestroy {
  personaid$:Observable<string> = this.store.select(AppPageState.getPersonId);
  persona$:Observable<Alumno | null> = this.store.select(PersonaPageState.getAlumnoSelected);
  cursos$:Observable<Curso[]> = this.store.select(CursoState.getCursos);
  cursos:Curso[] = []
  cursoSelected!:Curso;
  showConfirmation$:Observable<boolean> = this.store.select(AppPageState.showModalConfirmation)
  loading$:boolean = true;
  sortOptions: SortOption[] = [
    { label: 'Curso', field: 'descripcion' }
  ];
  constructor(private store:Store, private activated:ActivatedRoute, private confirmationService: ConfirmationService, private router:Router, private messageService: MessageService){}



   ngOnInit(): void {
    
    let materiaId = this.activated.snapshot.params['idMateria'];
    let filterCurso = new CursoFilter();
    filterCurso.materiaId = materiaId;
    this.store.dispatch(new GetCursoAction(filterCurso))

    
    this.cursos$.subscribe(x => { this.cursos = x ? [...x] : [] });

    

    this.loading$ = false;

 

    this.showConfirmation$.subscribe(x => {
      if(x){
        this.confirm();
      }
    })
  }


  confirm() {

    this.confirmationService.confirm({
      header: 'Inscripción a curso',
      message: '¿Desea inscribirse al curso?',
      acceptIcon: 'pi pi-check mr-2',
      rejectIcon: 'pi pi-times mr-2',
      rejectButtonStyleClass: 'p-button-sm',
      acceptButtonStyleClass: 'p-button-outlined p-button-sm',
        accept: () => {
          let al = new AlumnoInscripcionDto();
          al.alumnoId = this.store.selectSnapshot(AppPageState.getPersonId);
          al.condicion = Condicion.INSCRIPTO.toString();
          al.cursoId =  this.cursoSelected._id!;
          this.store.dispatch([
            new PostAlumnoInscripcionAction(al),
            new ShowModalConfirmationAction(false)
          ]).subscribe(x => {

            this.messageService.add({ severity: 'success', summary: 'Inscripción', detail: `Se ha inscrito al curso: ${this.cursoSelected.descripcion} - ${this.cursoSelected.anioCalendario}` });
            this.router.navigate([`alumno/catedras`])
          })
        },
        reject: () => {
          this.store.dispatch(new ShowModalConfirmationAction(false))
        }
    });
}

modalConfirmar(curso:Curso){
  this.cursoSelected = curso;
  this.store.dispatch(new ShowModalConfirmationAction(true));
}

redirectMateriasDisponibles(){
  const personId = this.store.selectSnapshot(AppPageState.getPersonId);
  this.router.navigate([`inscripcion-catedra/materias-disponibles`])
}

  ngOnDestroy(): void {
    this.store.dispatch(new ClearCursos());
  }


}
