import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { ButtonModule } from 'primeng/button';
import { MessagesModule } from 'primeng/messages';
import { PanelModule } from 'primeng/panel';
import { TableModule } from 'primeng/table';
import { Observable } from 'rxjs';
import { PersonaState } from '../../store/states/api/persona.state';
import { Alumno } from '../../entities/alumno';
import { Router, RouterModule } from '@angular/router';
import { GetAlumnosAction } from '../../store/actions/api/persona.action';
import { InputTextModule } from 'primeng/inputtext';
import { InputIconModule } from 'primeng/inputicon';
import { IconFieldModule } from 'primeng/iconfield';
import { CardModule } from 'primeng/card';
import { BlockUiComponent } from '../../components/util/block-ui/block-ui.component';
import { BlockUiGeneralComponent } from '../../components/util/block-ui-general/block-ui-general.component';

@Component({
  selector: 'app-alumno',
  standalone: true,
  imports: [CommonModule, PanelModule, RouterModule, CardModule, BlockUiGeneralComponent],
  templateUrl: './alumno.component.html',
  styleUrl: './alumno.component.scss'
})
export class AlumnoComponent {

}
