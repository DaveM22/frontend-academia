import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParametroListaComponent } from './parametro-lista.component';
import { provideStore, Store } from '@ngxs/store';
import { ParametroState } from '../../store/states/api/parametro.state';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { ScreenSizeService } from '../../services/screen-size.service.service';
import { provideNoopAnimations } from '@angular/platform-browser/animations';

describe('ParametroListaComponent', () => {
  let store: Store;
  let component: ParametroListaComponent;
  let fixture: ComponentFixture<ParametroListaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        provideStore([ParametroState]),
        provideHttpClient(withInterceptorsFromDi()),
        provideNoopAnimations(),
        MessageService,
        ScreenSizeService
      ]
    })
      .compileComponents();
    store = TestBed.inject(Store);
    fixture = TestBed.createComponent(ParametroListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});