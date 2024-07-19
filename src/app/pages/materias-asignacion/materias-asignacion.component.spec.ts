import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MateriasAsignacionComponent } from './materias-asignacion.component';

describe('MateriasAsignacionComponent', () => {
  let component: MateriasAsignacionComponent;
  let fixture: ComponentFixture<MateriasAsignacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MateriasAsignacionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MateriasAsignacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
