import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParameterComponent } from './parameter.component';
import { AppPageState } from '../../store/states/page/app.state';
import { ParametroState } from '../../store/states/api/parametro.state';
import { provideStore } from '@ngxs/store';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('ParameterComponent', () => {
  let component: ParameterComponent;
  let fixture: ComponentFixture<ParameterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ParameterComponent],
      providers:[
        provideStore([AppPageState, ParametroState]),
        provideHttpClient(withInterceptorsFromDi()),
        ]
        })
    .compileComponents();

    fixture = TestBed.createComponent(ParameterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
