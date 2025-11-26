import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MateriaFilterComponent } from './materia-filter.component';
import { provideStore, Store } from '@ngxs/store';
import { MateriaState } from '../../../store/states/api/materia.state';
import { PersonaPageState } from '../../../store/states/page/persona.state';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideRouter } from '@angular/router';

describe('MateriaFilterComponent', () => {
  let store: Store;
  let component: MateriaFilterComponent;
  let fixture: ComponentFixture<MateriaFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MateriaFilterComponent],
      providers: [
        provideStore([MateriaState, PersonaPageState]),
        provideHttpClient(withInterceptorsFromDi()),
        provideRouter([])
      ],
    })
      .compileComponents();
    store = TestBed.inject(Store);
    fixture = TestBed.createComponent(MateriaFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
