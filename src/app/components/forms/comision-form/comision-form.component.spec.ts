import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComisionFormComponent } from './comision-form.component';

describe('ComisionFormComponent', () => {
  let component: ComisionFormComponent;
  let fixture: ComponentFixture<ComisionFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComisionFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComisionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
