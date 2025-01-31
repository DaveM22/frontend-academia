import { CommonModule, DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { MenuItem } from 'primeng/api';
import { Button, ButtonModule } from 'primeng/button';
import { MenubarModule } from 'primeng/menubar';
import { SidebarModule } from 'primeng/sidebar';
import { map, Observable } from 'rxjs';
import { AppPageState } from '../../store/states/page/app.state';
import { FormsModule } from '@angular/forms';
import { ToggleMenuAction } from '../../store/actions/pages/app.action';
import { MenuModule } from 'primeng/menu';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { AuthService } from '@auth0/auth0-angular';
import { AvatarModule } from 'primeng/avatar';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'navbar',
  standalone: true,
  imports: [CommonModule,MenubarModule,AvatarModule, ButtonModule, CommonModule, SidebarModule,FormsModule, MenuModule, SidebarComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
  items: MenuItem[] | undefined;
  logItems:MenuItem[] | undefined;
  itemsSideBar: MenuItem[] | undefined;
  sidebarVisible:boolean = true;
  toggle$:Observable<boolean> = this.store.select(AppPageState.getToggle);
  toggle:boolean = false;
  picture!:string;
  name!:string;
  rol!:string;

  constructor(@Inject(DOCUMENT) public document:Document, private store:Store,private router:Router, public auth: AuthService){}

  ngOnInit() {
    this.itemsSideBar = [
      { label: 'Especialidades', icon: 'pi pi-plus', command: () => this.redirect("/especialidades/lista") },
      { label: 'Planes', icon: 'pi pi-search', command: () => this.redirect("/planes/lista") }
    ];
    this.auth.idTokenClaims$.subscribe(x => {
      this.picture = x!.picture!
      this.name = x!.name!
      this.rol = x![environment.roleLogin][0]
    })
      this.toggle$.subscribe( x => this.toggle = x);

        this.logItems = [
          {
          label:'Salir',
          icon: 'pi pi-user',
          command:() => this.logout()
        }]
    }

    toggleAction(){
      this.store.dispatch(new ToggleMenuAction(!this.toggle));
    }

    onHide(){
      this.store.dispatch(new ToggleMenuAction(false));
    }

    redirect(url:string){
      this.router.navigate([url])
      this.store.dispatch(new ToggleMenuAction(false));
    }

    logout(){
      this.auth.logout();
    }

    login(){
      this.auth.loginWithRedirect();
    }

    loginItems(){
      this.logItems = [{
        label:'Salir'
      }]
    } 
}
