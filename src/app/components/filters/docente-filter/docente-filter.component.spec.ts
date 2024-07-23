import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocenteFilterComponent } from './docente-filter.component';

describe('DocenteFilterComponent', () => {
  let component: DocenteFilterComponent;
  let fixture: ComponentFixture<DocenteFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DocenteFilterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocenteFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
