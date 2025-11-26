import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatedrasDocenteCursosComponent } from './catedras-docente-cursos.component';
import { provideStore, Store } from '@ngxs/store';
import { PersonaPageState } from '../../store/states/page/persona.state';
import { AppPageState } from '../../store/states/page/app.state';

describe('CatedrasDocenteCursosComponent', () => {
  let store :Store;
  let component: CatedrasDocenteCursosComponent;
  let fixture: ComponentFixture<CatedrasDocenteCursosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CatedrasDocenteCursosComponent],
      providers:[
        provideStore([PersonaPageState, AppPageState])
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CatedrasDocenteCursosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
