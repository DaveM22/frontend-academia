import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';


import { MenuModule } from 'primeng/menu';
import { MenuItem, MessageService, PrimeNGConfig } from 'primeng/api';

import { SidebarComponent } from './components/sidebar/sidebar.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import { MessagesModule } from 'primeng/messages';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, SidebarComponent, MenuModule, CommonModule, ToastModule,MessagesModule],
  providers:[MessageService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {




  constructor(private primengConfig: PrimeNGConfig) { }

  ngOnInit(): void {
      this.primengConfig.ripple = true;       //enables core ripple functionality

  }

}


