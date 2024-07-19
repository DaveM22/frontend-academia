import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignacionProfesorComponent } from './asignacion-profesor.component';

describe('AsignacionProfesorComponent', () => {
  let component: AsignacionProfesorComponent;
  let fixture: ComponentFixture<AsignacionProfesorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AsignacionProfesorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AsignacionProfesorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
