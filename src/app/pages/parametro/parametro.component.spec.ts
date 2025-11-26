import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParametroComponent } from './parametro.component';
import { provideStore, Store } from '@ngxs/store';
import { AppPageState } from '../../store/states/page/app.state';

describe('ParametroComponent', () => {
  let store: Store
  let component: ParametroComponent;
  let fixture: ComponentFixture<ParametroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ParametroComponent],
      providers:[
        provideStore([AppPageState])
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
