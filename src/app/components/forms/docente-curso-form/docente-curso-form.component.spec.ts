import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocenteCursoFormComponent } from './docente-curso-form.component';

describe('DocenteCursoFormComponent', () => {
  let component: DocenteCursoFormComponent;
  let fixture: ComponentFixture<DocenteCursoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DocenteCursoFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocenteCursoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
