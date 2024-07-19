import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MateriasModalComponent } from './materias-modal.component';

describe('MateriasModalComponent', () => {
  let component: MateriasModalComponent;
  let fixture: ComponentFixture<MateriasModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MateriasModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MateriasModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
