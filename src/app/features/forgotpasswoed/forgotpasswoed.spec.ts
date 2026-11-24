import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Forgotpasswoed } from './forgotpasswoed';

describe('Forgotpasswoed', () => {
  let component: Forgotpasswoed;
  let fixture: ComponentFixture<Forgotpasswoed>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Forgotpasswoed]
    })
      .compileComponents();

    fixture = TestBed.createComponent(Forgotpasswoed);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
