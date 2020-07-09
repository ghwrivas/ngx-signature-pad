import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { NgxSignaturePadModule } from 'ngx-signature-pad';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NgxSignaturePadModule],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

});
