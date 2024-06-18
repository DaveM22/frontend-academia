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
      { label: 'Especialidades', icon: 'pi pi-cog', command: () => this.router.navigate(["/especialidades"]) },
      { label: 'Planes y materias', icon: 'pi pi-cog', command: () => this.router.navigate(["/planes"]) },
      { label: 'Profesores' , icon:'pi pi-cog', command: () => this.router.navigate(["/comisiones"])},
      { label: 'Comisiones' , icon:'pi pi-cog', command: () => this.router.navigate(["/comisiones"])},
      { label: 'Cursos' , icon:'pi pi-cog', command: () => this.router.navigate(["/comisiones"])},
      { label: 'Inscripciones de alumnos' , icon:'pi pi-cog', command: () => this.router.navigate(["/comisiones"])},
      { label: 'Profesores en cursos' , icon:'pi pi-cog', command: () => this.router.navigate(["/comisiones"])},
      { label: 'Usuarios' , icon:'pi pi-cog', command: () => this.router.navigate(["/comisiones"])}
    ];
  }

  
}
