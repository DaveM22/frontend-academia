import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanNuevoComponent } from './plan-nuevo.component';

describe('PlanNuevoComponent', () => {
  let component: PlanNuevoComponent;
  let fixture: ComponentFixture<PlanNuevoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlanNuevoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlanNuevoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
