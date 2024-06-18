import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanMateriasComponent } from './plan-materias.component';

describe('PlanMateriasComponent', () => {
  let component: PlanMateriasComponent;
  let fixture: ComponentFixture<PlanMateriasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlanMateriasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlanMateriasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
