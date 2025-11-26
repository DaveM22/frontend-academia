import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComisionFormComponent } from './comision-form.component';
import { provideStore, Store } from '@ngxs/store';
import { AppPageState } from '../../../store/states/page/app.state';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { MessageService } from 'primeng/api';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { ComisionPageState } from '../../../store/states/page/comision.state';
import { ComisionState } from '../../../store/states/api/comision.state';

describe('ComisionFormComponent', () => {
  let store: Store
  let component: ComisionFormComponent;
  let fixture: ComponentFixture<ComisionFormComponent>;
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComisionFormComponent],
      providers:[
        provideStore([AppPageState, ComisionPageState, ComisionState]),
        provideHttpClient(withInterceptorsFromDi()),
        provideRouter([]),
        provideNoopAnimations(),
        MessageService
      ]
    })
    .compileComponents();
    store = TestBed.inject(Store);
    fixture = TestBed.createComponent(ComisionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
