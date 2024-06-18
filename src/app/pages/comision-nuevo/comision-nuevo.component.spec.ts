import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComisionNuevoComponent } from './comision-nuevo.component';

describe('ComisionNuevoComponent', () => {
  let component: ComisionNuevoComponent;
  let fixture: ComponentFixture<ComisionNuevoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComisionNuevoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComisionNuevoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
