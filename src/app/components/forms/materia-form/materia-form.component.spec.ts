import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MateriaFormComponent } from './materia-form.component';
import { provideStore, Store } from '@ngxs/store';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { MessageService } from 'primeng/api';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { MateriaPageState } from '../../../store/states/page/materia.page.state';

describe('MateriaFormComponent', () => {
  let store: Store;
  let component: MateriaFormComponent;
  let fixture: ComponentFixture<MateriaFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MateriaFormComponent],
      providers: [
        provideStore([MateriaPageState]),
        provideHttpClient(withInterceptorsFromDi()),
        provideRouter([]),
        provideNoopAnimations(),
        MessageService
      ],
    })
      .compileComponents();
    store = TestBed.inject(Store);
    fixture = TestBed.createComponent(MateriaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
