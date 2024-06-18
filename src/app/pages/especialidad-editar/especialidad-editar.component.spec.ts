import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EspecialidadEditarComponent } from './especialidad-editar.component';

describe('EspecialidadEditarComponent', () => {
  let component: EspecialidadEditarComponent;
  let fixture: ComponentFixture<EspecialidadEditarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EspecialidadEditarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EspecialidadEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
