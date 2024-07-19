import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MateriaCursosComponent } from './materia-cursos.component';

describe('MateriaCursosComponent', () => {
  let component: MateriaCursosComponent;
  let fixture: ComponentFixture<MateriaCursosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MateriaCursosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MateriaCursosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
