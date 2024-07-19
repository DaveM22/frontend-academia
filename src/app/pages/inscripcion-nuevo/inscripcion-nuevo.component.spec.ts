import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InscripcionNuevoComponent } from './inscripcion-nuevo.component';

describe('InscripcionNuevoComponent', () => {
  let component: InscripcionNuevoComponent;
  let fixture: ComponentFixture<InscripcionNuevoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InscripcionNuevoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InscripcionNuevoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
