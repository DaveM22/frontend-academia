import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EspecialidadListaComponent } from './especialidad-lista.component';

describe('EspecialidadListaComponent', () => {
  let component: EspecialidadListaComponent;
  let fixture: ComponentFixture<EspecialidadListaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EspecialidadListaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EspecialidadListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
