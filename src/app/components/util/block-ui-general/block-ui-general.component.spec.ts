import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockUiGeneralComponent } from './block-ui-general.component';

describe('BlockUiGeneralComponent', () => {
  let component: BlockUiGeneralComponent;
  let fixture: ComponentFixture<BlockUiGeneralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlockUiGeneralComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlockUiGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
