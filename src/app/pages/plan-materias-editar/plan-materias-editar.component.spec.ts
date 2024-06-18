import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanMateriasEditarComponent } from './plan-materias-editar.component';

describe('PlanMateriasEditarComponent', () => {
  let component: PlanMateriasEditarComponent;
  let fixture: ComponentFixture<PlanMateriasEditarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlanMateriasEditarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlanMateriasEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
