import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NovedadesAlumnoComponent } from './novedades-alumno.component';

describe('NovedadesAlumnoComponent', () => {
  let component: NovedadesAlumnoComponent;
  let fixture: ComponentFixture<NovedadesAlumnoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NovedadesAlumnoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NovedadesAlumnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
