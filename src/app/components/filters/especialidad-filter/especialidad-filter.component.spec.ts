import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EspecialidadFilterComponent } from './especialidad-filter.component';

describe('EspecialidadFilterComponent', () => {
  let component: EspecialidadFilterComponent;
  let fixture: ComponentFixture<EspecialidadFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EspecialidadFilterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EspecialidadFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
