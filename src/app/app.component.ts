import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';


import { MenuModule } from 'primeng/menu';
import {  MessageService } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import { MessagesModule } from 'primeng/messages';
import { ButtonModule } from 'primeng/button';
import { PrimeNG } from 'primeng/config';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,ToastModule,MessagesModule, ButtonModule],
  providers:[MessageService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {


    constructor(private primeng:PrimeNG){

    }
  ngOnInit(): void {
    this.primeng.ripple.set(true);
  }

}


