import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanMateriasNuevoComponent } from './plan-materias-nuevo.component';

describe('PlanMateriasNuevoComponent', () => {
  let component: PlanMateriasNuevoComponent;
  let fixture: ComponentFixture<PlanMateriasNuevoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlanMateriasNuevoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlanMateriasNuevoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
