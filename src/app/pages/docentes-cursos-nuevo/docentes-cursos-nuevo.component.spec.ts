import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocentesCursosNuevoComponent } from './docentes-cursos-nuevo.component';

describe('DocentesCursosNuevoComponent', () => {
  let component: DocentesCursosNuevoComponent;
  let fixture: ComponentFixture<DocentesCursosNuevoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DocentesCursosNuevoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocentesCursosNuevoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
