import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlumnoNuevoComponent } from './alumno-nuevo.component';

describe('AlumnoNuevoComponent', () => {
  let component: AlumnoNuevoComponent;
  let fixture: ComponentFixture<AlumnoNuevoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlumnoNuevoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlumnoNuevoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
