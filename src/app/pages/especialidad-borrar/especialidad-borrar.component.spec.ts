import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EspecialidadBorrarComponent } from './especialidad-borrar.component';
import { provideStore, Store } from '@ngxs/store';
import { EspecialidadState } from '../../store/states/api/especialidad.state';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { MessageService } from 'primeng/api';
import { provideNoopAnimations } from '@angular/platform-browser/animations';

describe('EspecialidadBorrarComponent', () => {
  let store: Store
  let component: EspecialidadBorrarComponent;
  let fixture: ComponentFixture<EspecialidadBorrarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EspecialidadBorrarComponent],
      providers:[
        provideStore([EspecialidadState]),
        provideHttpClient(withInterceptorsFromDi()),
        provideRouter([]),
        provideNoopAnimations(),
        MessageService
      ]})
    .compileComponents();

    fixture = TestBed.createComponent(EspecialidadBorrarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
