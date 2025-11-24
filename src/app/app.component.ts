import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';


import { MenuModule } from 'primeng/menu';
import {  MessageService } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { MessagesModule } from 'primeng/messages';
import { ButtonModule } from 'primeng/button';
import { PrimeNG } from 'primeng/config';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,MessagesModule, ButtonModule],
  providers:[MessageService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {


    constructor(private primeng:PrimeNG, private messageService: MessageService){

    }
  ngOnInit(): void {
    this.primeng.ripple.set(true);
    this.messageService.messageObserver.subscribe(() => {
      setTimeout(() => {
        this.messageService.clear();
      }, 5000);
    });
  }

}


