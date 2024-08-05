import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatedrasAlumnoComponent } from './catedras-alumno.component';

describe('CatedrasAlumnoComponent', () => {
  let component: CatedrasAlumnoComponent;
  let fixture: ComponentFixture<CatedrasAlumnoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CatedrasAlumnoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CatedrasAlumnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
