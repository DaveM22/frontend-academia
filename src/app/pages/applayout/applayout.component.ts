import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { RouterOutlet } from '@angular/router';
import { PanelModule } from 'primeng/panel';
import { Menubar, MenubarModule } from 'primeng/menubar';
import { CardModule } from 'primeng/card';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-applayout',
  standalone: true,
  imports: [RouterOutlet, CommonModule, SidebarComponent, CardModule, SidebarModule, ButtonModule],
  templateUrl: './applayout.component.html',
  styleUrl: './applayout.component.scss'
})
export class ApplayoutComponent {
  sidebarVisible: boolean = false;

  toggleSidebar() {
    this.sidebarVisible = !this.sidebarVisible;
  }
}
