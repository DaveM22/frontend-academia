import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CursoListaComponent } from './curso-lista.component';
import { provideStore, Store } from '@ngxs/store';
import { CursoState } from '../../store/states/api/curso.state';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { ScreenSizeService } from '../../services/screen-size.service.service';
import { provideNoopAnimations } from '@angular/platform-browser/animations';

describe('CursoListaComponent', () => {
  let store: Store;
  let component: CursoListaComponent;
  let fixture: ComponentFixture<CursoListaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CursoListaComponent],
      providers: [
        provideStore([CursoState]),
        provideHttpClient(withInterceptorsFromDi()),
        provideNoopAnimations(),
        MessageService,
        ScreenSizeService
      ],
    })
      .compileComponents();
    store = TestBed.inject(Store);
    fixture = TestBed.createComponent(CursoListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});