import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EspecialidadBorrarComponent } from './especialidad-borrar.component';

describe('EspecialidadBorrarComponent', () => {
  let component: EspecialidadBorrarComponent;
  let fixture: ComponentFixture<EspecialidadBorrarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EspecialidadBorrarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EspecialidadBorrarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
