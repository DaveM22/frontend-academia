import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocentesCursosComponent } from './docentes-cursos.component';

describe('DocentesCursosComponent', () => {
  let component: DocentesCursosComponent;
  let fixture: ComponentFixture<DocentesCursosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DocentesCursosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocentesCursosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
