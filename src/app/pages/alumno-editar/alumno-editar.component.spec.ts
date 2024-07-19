import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlumnoEditarComponent } from './alumno-editar.component';

describe('AlumnoEditarComponent', () => {
  let component: AlumnoEditarComponent;
  let fixture: ComponentFixture<AlumnoEditarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlumnoEditarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlumnoEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
