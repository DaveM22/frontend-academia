import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { RouterOutlet } from '@angular/router';
import { PanelModule } from 'primeng/panel';
import { Menubar, MenubarModule } from 'primeng/menubar';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-applayout',
  standalone: true,
  imports: [RouterOutlet,CommonModule, NavbarComponent, SidebarComponent, CardModule],
  templateUrl: './applayout.component.html',
  styleUrl: './applayout.component.scss'
})
export class ApplayoutComponent {
  isSidebarVisible: boolean = true;

  toggleSidebar() {
    this.isSidebarVisible = !this.isSidebarVisible;
  }
}
