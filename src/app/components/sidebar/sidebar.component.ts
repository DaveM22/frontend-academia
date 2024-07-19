import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { MenuModule } from 'primeng/menu';
import { SidebarModule } from 'primeng/sidebar';
import { PanelMenuModule } from 'primeng/panelmenu';
@Component({
  selector: 'sidebar',
  standalone: true,
  imports: [MenuModule, SidebarModule, PanelMenuModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent implements OnInit {
  items: MenuItem[] | undefined;
  sidebarVisible:boolean = true;
  constructor(private router:Router){}



  ngOnInit(): void {
    this.items = [
      { label: 'Alumnos' , icon:'pi pi pi-user', command: () => this.router.navigate(["/personas/alumnos"])},
      { label: 'Profesores' , icon:'pi pi pi-user', command: () => this.router.navigate(["/personas/profesores"])},
      { label: 'Especialidades', icon: 'pi pi-cog', command: () => this.router.navigate(["/especialidades/lista"]) },
      { label: 'Planes y materias', icon: 'pi pi-cog', command: () => this.router.navigate(["/planes"]) },
      { label: 'Comisiones' , icon:'pi pi-cog', command: () => this.router.navigate(["/comisiones"])},
      { label: 'Cursos' , icon:'pi pi-cog', command: () => this.router.navigate(["/cursos"])},
      { label: 'Inscripciones de alumnos' , icon:'pi pi-cog', command: () => this.router.navigate(["/inscripciones-alumnos"])},
      { label: 'Profesores en cursos' , icon:'pi pi-cog', command: () => this.router.navigate(["/asignacion-docentes/seleccionar-materia"])},
      { label: 'Usuarios' , icon:'pi pi-cog', command: () => this.router.navigate(["/comisiones"])}
    ];
  }

  
}
