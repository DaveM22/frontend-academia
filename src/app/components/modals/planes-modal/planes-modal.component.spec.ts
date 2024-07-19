import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanesModalComponent } from './planes-modal.component';

describe('PlanesModalComponent', () => {
  let component: PlanesModalComponent;
  let fixture: ComponentFixture<PlanesModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlanesModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlanesModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
