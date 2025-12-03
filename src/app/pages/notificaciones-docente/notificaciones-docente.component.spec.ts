import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificacionesDocenteComponent } from './notificaciones-docente.component';

describe('NotificacionesDocenteComponent', () => {
  let component: NotificacionesDocenteComponent;
  let fixture: ComponentFixture<NotificacionesDocenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotificacionesDocenteComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(NotificacionesDocenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
