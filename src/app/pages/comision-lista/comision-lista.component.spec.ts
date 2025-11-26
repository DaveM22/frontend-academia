import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComisionListaComponent } from './comision-lista.component';
import { provideStore, Store } from '@ngxs/store';
import { ComisionState } from '../../store/states/api/comision.state';
import { NgModule } from '@angular/core';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { ConfirmationService, MessageService } from 'primeng/api';
import { provideNoopAnimations } from '@angular/platform-browser/animations';

describe('ComisionListaComponent', () => {
  let store: Store;
  let component: ComisionListaComponent;
  let fixture: ComponentFixture<ComisionListaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComisionListaComponent],
      providers: [
        provideStore([ComisionState]),
        provideHttpClient(withInterceptorsFromDi()),
        provideNoopAnimations(),
        MessageService],
    })
      .compileComponents();
    store = TestBed.inject(Store);
    fixture = TestBed.createComponent(ComisionListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
