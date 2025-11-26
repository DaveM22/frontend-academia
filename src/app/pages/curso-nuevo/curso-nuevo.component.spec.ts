import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CursoNuevoComponent } from './curso-nuevo.component';
import { provideStore, Store } from '@ngxs/store';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ComisionState } from '../../store/states/api/comision.state';
import { provideNoopAnimations } from '@angular/platform-browser/animations';

describe('CursoNuevoComponent', () => {
  let store: Store;
  let component: CursoNuevoComponent;
  let fixture: ComponentFixture<CursoNuevoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CursoNuevoComponent],
      providers: [
        provideStore([ComisionState]),
        provideHttpClient(withInterceptorsFromDi()),
        provideRouter([]),
        provideNoopAnimations(),
        MessageService
      ],
    })
    .compileComponents();
    store = TestBed.inject(Store);
    fixture = TestBed.createComponent(CursoNuevoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
