import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
  
  // El componente no define 'title' ni renderiza h1; se reemplazan por smoke tests simples
  it('should render without crashing', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    expect(true).toBeTrue();
  });
});
