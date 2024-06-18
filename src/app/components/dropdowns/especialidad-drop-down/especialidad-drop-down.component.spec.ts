import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EspecialidadDropDownComponent } from './especialidad-drop-down.component';

describe('EspecialidadDropDownComponent', () => {
  let component: EspecialidadDropDownComponent;
  let fixture: ComponentFixture<EspecialidadDropDownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EspecialidadDropDownComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EspecialidadDropDownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
