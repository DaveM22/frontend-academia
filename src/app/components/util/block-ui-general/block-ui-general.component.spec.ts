import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockUiGeneralComponent } from './block-ui-general.component';
import { provideStore, Store } from '@ngxs/store';
import { AppPageState } from '../../../store/states/page/app.state';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideRouter } from '@angular/router';

describe('BlockUiGeneralComponent', () => {
  let store: Store;
  let component: BlockUiGeneralComponent;
  let fixture: ComponentFixture<BlockUiGeneralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlockUiGeneralComponent],
      providers: [
        provideStore([AppPageState]),
        provideHttpClient(withInterceptorsFromDi()),
        provideRouter([])
      ],
    })
      .compileComponents();
    store = TestBed.inject(Store);
    fixture = TestBed.createComponent(BlockUiGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
