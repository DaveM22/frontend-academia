import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MateriaFilterComponent } from './materia-filter.component';

describe('MateriaFilterComponent', () => {
  let component: MateriaFilterComponent;
  let fixture: ComponentFixture<MateriaFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MateriaFilterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MateriaFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
