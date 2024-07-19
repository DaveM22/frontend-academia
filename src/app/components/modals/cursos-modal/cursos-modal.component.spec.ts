import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CursosModalComponent } from './cursos-modal.component';

describe('CursosModalComponent', () => {
  let component: CursosModalComponent;
  let fixture: ComponentFixture<CursosModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CursosModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CursosModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
