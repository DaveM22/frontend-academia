import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { TableModule } from 'primeng/table';
import { Observable } from 'rxjs';
import { Especialidad } from '../../entities/especialidad';
import { EspecialidadState } from '../../store/states/api/especialidad.state';
import { GetEspecialidadAction } from '../../store/actions/api/especialidad.action';
import { ButtonModule } from 'primeng/button';
import { EspecialidadBorrarComponent } from '../especialidad-borrar/especialidad-borrar.component';
import { ShowModalDelete } from '../../store/actions/pages/especialidad.action';
import { MessagesModule } from 'primeng/messages';
import { Router, RouterModule } from '@angular/router';
import { PanelModule } from 'primeng/panel';
import { ToastModule } from 'primeng/toast';
import { InputTextModule } from 'primeng/inputtext';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { AsignarEspecialidadId } from '../../store/actions/pages/navigate.action';
import { CardModule } from 'primeng/card';
@Component({
  selector: 'app-especialidad',
  standalone: true,
  imports: [RouterModule,CommonModule, PanelModule, CardModule],
  templateUrl: './especialidad.component.html',
  styleUrl: './especialidad.component.scss'
})
export class EspecialidadComponent  {


}
