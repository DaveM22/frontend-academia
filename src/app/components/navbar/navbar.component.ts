import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { MenuItem } from 'primeng/api';
import { Button, ButtonModule } from 'primeng/button';
import { MenubarModule } from 'primeng/menubar';
import { SidebarModule } from 'primeng/sidebar';
import { Observable } from 'rxjs';
import { AppPageState } from '../../store/states/page/app.state';
import { FormsModule } from '@angular/forms';
import { ToggleMenuAction } from '../../store/actions/pages/app.action';
import { MenuModule } from 'primeng/menu';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'navbar',
  standalone: true,
  imports: [CommonModule,MenubarModule, ButtonModule, CommonModule, SidebarModule,FormsModule, MenuModule, SidebarComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {

  toggle$:Observable<boolean> = this.store.select(AppPageState.getToggle);
  toggle:boolean = false;
  constructor(private store:Store,private router:Router){

  }

  items: MenuItem[] | undefined;

  itemsSideBar: MenuItem[] | undefined;
  sidebarVisible:boolean = true;




  ngOnInit() {
    this.itemsSideBar = [
      { label: 'Especialidades', icon: 'pi pi-plus', command: () => this.router.navigate(["/especialidades"]) },
      { label: 'Planes', icon: 'pi pi-search', command: () => this.router.navigate(["/planes"]) }
    ];
      this.toggle$.subscribe( x => this.toggle = x);
      this.items = [
          {
              label: 'Inicio',
              icon: 'pi pi-home',
              command:() =>this.router.navigate(["/"])
          }
        ]
    }

    toggleAction(){
      console.log('asd')
      this.store.dispatch(new ToggleMenuAction(!this.toggle));
    }

    onHide(){
      console.log('asd22')
      this.store.dispatch(new ToggleMenuAction(false));
    }
}
