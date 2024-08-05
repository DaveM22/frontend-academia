import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CursosDisponiblesComponent } from './cursos-disponibles.component';

describe('CursosDisponiblesComponent', () => {
  let component: CursosDisponiblesComponent;
  let fixture: ComponentFixture<CursosDisponiblesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CursosDisponiblesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CursosDisponiblesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
