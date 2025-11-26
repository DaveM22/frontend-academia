import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfesorListaComponent } from './profesor-lista.component';
import { provideStore, Store } from '@ngxs/store';
import { PersonaState } from '../../store/states/api/persona.state';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { ScreenSizeService } from '../../services/screen-size.service.service';
import { provideNoopAnimations } from '@angular/platform-browser/animations';

describe('ProfesorListaComponent', () => {
  let store: Store;
  let component: ProfesorListaComponent;
  let fixture: ComponentFixture<ProfesorListaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfesorListaComponent],
      providers: [
        provideStore([PersonaState]),
        provideHttpClient(withInterceptorsFromDi()),
        provideNoopAnimations(),
        MessageService,
        ScreenSizeService
      ],
    })
      .compileComponents();
    store = TestBed.inject(Store);
    fixture = TestBed.createComponent(ProfesorListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});