import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngxs/store';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { RippleModule } from 'primeng/ripple';
import { Cargo } from '../../../entities/enums';
import { DropdownModule } from 'primeng/dropdown';
import { CommonModule, KeyValuePipe } from '@angular/common';
import { Observable } from 'rxjs';
import { Curso } from '../../../entities/curso';
import { CursoPageState } from '../../../store/states/page/curso.state';
import { GetByIdCursoAction } from '../../../store/actions/api/curso.action';
import { ActivatedRoute, Router } from '@angular/router';
import { DocenteModalComponent } from '../../modals/docente-modal/docente-modal.component';
import { ShowDocenteModal } from '../../../store/actions/pages/app.action';
import { Profesor } from '../../../entities/profesor';
import { AppPageState } from '../../../store/states/page/app.state';
import { DocenteCurso, DocenteCursoDto } from '../../../entities/docente-curso';
import { PostDocenteCursoAction } from '../../../store/actions/api/docente-curso.action';

@Component({
  selector: 'app-docente-curso-form',
  standalone: true,
  imports: [ReactiveFormsModule,DocenteModalComponent,CommonModule, KeyValuePipe, InputTextModule, CardModule, ButtonModule, RippleModule, DropdownModule],
  templateUrl: './docente-curso-form.component.html',
  styleUrl: './docente-curso-form.component.scss'
})
export class DocenteCursoFormComponent implements OnInit {
  @Input() title!:string;
  @Input() cursoId!:string;
  curso$:Observable<Curso | null> = this.store.select(CursoPageState.getCursoSelected);
  docenteModal$:Observable<Profesor | null> = this.store.select(AppPageState.getSelectedDocenteInModal);
  curso!:Curso;
  form!:FormGroup
  docenteCursoDto!:DocenteCursoDto

  cargos!:string[];

  constructor(private store:Store, private router:Router){}

  ngOnInit(): void {
    this.store.dispatch(new GetByIdCursoAction(this.cursoId));
    this.cargos = [Cargo.TEORIA.toString(), Cargo.PRACTICA.toString()]
      this.form = new FormGroup({
      _id: new FormControl(null),
      curso: new FormControl({value:'', disabled:true}, [Validators.required]),
      cursoId: new FormControl('', [Validators.required]),
      profesor: new FormControl({value:'', disabled:true}, [Validators.required]),
      profesorId: new FormControl('', [Validators.required]),
      cargo: new FormControl('', [Validators.required])
    });

    this.curso$.subscribe(x => {
      if(x !== null){
        this.curso = x;
        this.form.patchValue({'curso':this.curso.descripcion, 'cursoId':this.curso._id})
      }
    })

    this.docenteModal$.subscribe(x => {
      if(x !== null){
        this.form.patchValue({'profesor':`${x.apellido} ${x.nombre}`, 'profesorId':x._id})
      }
    })



  
  }

  modalProfesores(){
      
      this.store.dispatch(new ShowDocenteModal(true));
  }

  redirectDocenteCursos(){

  }

  onSubmit(){
    this.docenteCursoDto = this.form.value;
    this.store.dispatch(new PostDocenteCursoAction(this.docenteCursoDto)).subscribe(() => {
      this.router.navigate([`asignacion-docentes/${this.curso.materia?._id}/${this.curso._id}/docentes`])
    });
  }
}
