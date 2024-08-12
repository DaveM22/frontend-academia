import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatedrasDocenteComponent } from './catedras-docente.component';

describe('CatedrasDocenteComponent', () => {
  let component: CatedrasDocenteComponent;
  let fixture: ComponentFixture<CatedrasDocenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CatedrasDocenteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CatedrasDocenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
