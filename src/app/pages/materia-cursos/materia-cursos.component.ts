import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable, lastValueFrom } from 'rxjs';
import { Curso } from '../../entities/curso';
import { CursoState } from '../../store/states/api/curso.state';
import { ActivatedRoute, Router } from '@angular/router';
import { CursoFilter } from '../../entities/filter';
import { GetCursoAction } from '../../store/actions/api/curso.action';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { MessagesModule } from 'primeng/messages';
import { TableModule } from 'primeng/table';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { AppPageState } from '../../store/states/page/app.state';
import { BlockUiComponent } from '../../components/util/block-ui/block-ui.component';
import { MobileSortSelectComponent, SortOption } from '../../components/util/mobile-sort-select/mobile-sort-select.component';

@Component({
  selector: 'app-materia-cursos',
  standalone: true,
  imports: [CommonModule, TableModule, ButtonModule, IconFieldModule, InputIconModule, MessagesModule, InputTextModule, ProgressSpinnerModule, BlockUiComponent, MobileSortSelectComponent],
  templateUrl: './materia-cursos.component.html',
  styleUrl: './materia-cursos.component.scss'
})
export class MateriaCursosComponent implements OnInit {
  cursos$:Observable<Curso[]> = this.store.select(CursoState.getCursos);
  cursos: Curso[] = []; 
  sortOptions: SortOption[] = [
    { label: 'Curso', field: 'descripcion' }
  ];
  materiaId:string = ''
  loading$:Observable<boolean> = this.store.select(AppPageState.getFormLoading);
  constructor(private store:Store, private activateRouter:ActivatedRoute, private route:Router){}


  async ngOnInit(): Promise<void> {
    this.materiaId = this.activateRouter.snapshot.params['id'];
    this.cursos$.subscribe(x => this.cursos = x ? [...x] : []);
    let filter = new CursoFilter();
    filter.materiaId = this.materiaId;
    this.store.dispatch(new GetCursoAction(filter));

    const cursos = await lastValueFrom(this.cursos$);

  }




  redirectDocentesCursos(id:string){
    this.route.navigate([`asignacion-docentes/${this.materiaId}/${id}/docentes`]);
  }

  redirectSeleccionarMateria(){
    this.route.navigate(["/asignacion-docentes/seleccionar-materia"])
  }

}
