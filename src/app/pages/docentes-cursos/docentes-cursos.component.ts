import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { MessagesModule } from 'primeng/messages';
import { TableModule } from 'primeng/table';
import { Observable } from 'rxjs';
import { Curso } from '../../entities/curso';
import { Store } from '@ngxs/store';
import { DocenteCursoState } from '../../store/states/api/docente-curso.state';
import { DocenteCurso } from '../../entities/docente-curso';
import { ActivatedRoute, Router } from '@angular/router';
import { DeleteDocenteCursoAction, GetDocenteCursoAction } from '../../store/actions/api/docente-curso.action';
import { DocenteCursoFilter } from '../../entities/filter';
import { CursoState } from '../../store/states/api/curso.state';
import { CursoPageState } from '../../store/states/page/curso.state';
import { GetByIdCursoAction } from '../../store/actions/api/curso.action';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { AppPageState } from '../../store/states/page/app.state';
import { ShowModalConfirmationAction } from '../../store/actions/pages/app.action';

@Component({
  selector: 'app-docentes-cursos',
  standalone: true,
  imports: [CommonModule, TableModule, ButtonModule, IconFieldModule, InputIconModule, MessagesModule, InputTextModule, ConfirmDialogModule],
  templateUrl: './docentes-cursos.component.html',
  styleUrl: './docentes-cursos.component.scss',
  providers:[ConfirmationService]
})
export class DocentesCursosComponent implements OnInit {
  docenteCursos$: Observable<DocenteCurso[]> = this.store.select(DocenteCursoState.getDocentesCursos);
  showConfirmation$:Observable<boolean> = this.store.select(AppPageState.showModalConfirmation)
  curso$:Observable<Curso | null> = this.store.select(CursoPageState.getCursoSelected);
  loading$: Observable<boolean> = this.store.select(DocenteCursoState.getLoading);
  docenteCursoSelected!:DocenteCurso
  materiaId:string='';
  cursoId:string='';
  curso!:Curso;
  constructor(
    private store:Store, 
    private activateRoute:ActivatedRoute, 
    private router:Router, 
    private confirmationService:ConfirmationService,
    private messageService:MessageService)
    {}

  ngOnInit(): void {  
    this.curso$.subscribe(x => {
      if(x!== null){
        this.curso = x;
      }
    })

    this.materiaId = this.activateRoute.snapshot.params['idMateria'];
    this.cursoId = this.activateRoute.snapshot.params['idCurso'];
    let filter = new DocenteCursoFilter();
    filter.cursoId = this.cursoId
    this.store.dispatch(new GetByIdCursoAction(this.cursoId));
    this.store.dispatch(new GetDocenteCursoAction(filter));

    this.showConfirmation$.subscribe(x => {
      if(x  && this.docenteCursoSelected){
        this.confirm();
      }
    })
  }

  redirectNewDocenteCurso(){
    this.router.navigate([`asignacion-docentes/${this.materiaId}/${this.cursoId}/docentes/nuevo`])
  }

  confirm() {
    this.confirmationService.confirm({
      header: 'Borrar curso',
      message: `¿Desea eliminar la sigueinte asignación de profesor?`,
      acceptIcon: 'pi pi-check mr-2',
      rejectIcon: 'pi pi-times mr-2',
      rejectButtonStyleClass: 'p-button-sm',
      acceptButtonStyleClass: 'p-button-outlined p-button-sm',
      accept: () => {
        this.store.dispatch(new DeleteDocenteCursoAction(this.docenteCursoSelected._id))
          .subscribe(() => {
            this.store.dispatch(new ShowModalConfirmationAction(false))
            this.messageService.add({ severity: 'success', summary: 'Borrar asignación de profesor a curso', detail: `Se ha borrado la asignación al curso` });
          })
      },
      reject: () => {
        this.store.dispatch(new ShowModalConfirmationAction(false))
      }
    });
  }

  modalConfirmar(docenteCurso:DocenteCurso){
    this.docenteCursoSelected = docenteCurso;
    this.store.dispatch(new ShowModalConfirmationAction(true));
  }


  redirectBackToCourses(){
    this.router.navigate([`asignacion-docentes/${this.materiaId}/seleccionar-curso`])
  }


}
