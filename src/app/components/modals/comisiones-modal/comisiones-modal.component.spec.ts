import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComisionesModalComponent } from './comisiones-modal.component';

describe('ComisionesModalComponent', () => {
  let component: ComisionesModalComponent;
  let fixture: ComponentFixture<ComisionesModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComisionesModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComisionesModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
