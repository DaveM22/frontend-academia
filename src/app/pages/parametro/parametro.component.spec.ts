import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParametroComponent } from './parametro.component';
import { provideStore, Store } from '@ngxs/store';
import { AppPageState } from '../../store/states/page/app.state';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { ParametroState } from '../../store/states/api/parametro.state';

describe('ParametroComponent', () => {
  let store: Store
  let component: ParametroComponent;
  let fixture: ComponentFixture<ParametroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ParametroComponent],
      providers:[
        provideStore([AppPageState, ParametroState]),
        provideHttpClient(withInterceptorsFromDi()),
        provideRouter([]),
        provideNoopAnimations()
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParametroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
