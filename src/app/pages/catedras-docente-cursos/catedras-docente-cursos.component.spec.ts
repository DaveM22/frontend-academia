import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatedrasDocenteCursosComponent } from './catedras-docente-cursos.component';

describe('CatedrasDocenteCursosComponent', () => {
  let component: CatedrasDocenteCursosComponent;
  let fixture: ComponentFixture<CatedrasDocenteCursosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CatedrasDocenteCursosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CatedrasDocenteCursosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
