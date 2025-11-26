import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatedrasAlumnoComponent } from './catedras-alumno.component';
import { provideStore, Store } from '@ngxs/store';
import { PersonaState } from '../../store/states/api/persona.state';
import { AppPageState } from '../../store/states/page/app.state';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { provideNoopAnimations } from '@angular/platform-browser/animations';

describe('CatedrasAlumnoComponent', () => {
  let store:Store;
  let component: CatedrasAlumnoComponent;
  let fixture: ComponentFixture<CatedrasAlumnoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CatedrasAlumnoComponent],
      providers:[
        provideStore([
          PersonaState,
          AppPageState
        ]),
        provideHttpClient(withInterceptorsFromDi()),
        MessageService
      ]
    })
    .compileComponents();
    store = TestBed.inject(Store);

    fixture = TestBed.createComponent(CatedrasAlumnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
