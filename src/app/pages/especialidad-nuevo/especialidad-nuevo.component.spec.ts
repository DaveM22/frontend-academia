import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EspecialidadNuevoComponent } from './especialidad-nuevo.component';

describe('EspecialidadNuevoComponent', () => {
  let component: EspecialidadNuevoComponent;
  let fixture: ComponentFixture<EspecialidadNuevoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EspecialidadNuevoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EspecialidadNuevoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
