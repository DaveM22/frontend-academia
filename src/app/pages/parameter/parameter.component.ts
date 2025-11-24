import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { PanelModule } from 'primeng/panel';
import { RippleModule } from 'primeng/ripple';
import { SelectButtonModule } from 'primeng/selectbutton';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
@Component({
  selector: 'app-parameter',
  standalone: true,
  imports: [ReactiveFormsModule,ToggleSwitchModule,RouterModule,CommonModule, PanelModule, CardModule, InputTextModule, ButtonModule, RippleModule],
  templateUrl: './parameter.component.html',
  styleUrl: './parameter.component.scss'
})
export class ParameterComponent implements OnInit {

  form!: FormGroup;

  stateOptions: any[] = [
    { label: 'No', value: 'off' },
    { label: 'Si', value: 'on' }
  ];

  constructor(private router:Router){}

  ngOnInit(): void {
      this.form = new FormGroup({
      habilitarInscripciones: new FormControl(false, [Validators.required]),
      
   });
  }

  onSubmit(){

  }

  redirectHome(){
    this.router.navigate(["/"])
  }


}
