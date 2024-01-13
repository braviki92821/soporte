import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderSoporteComponent } from './header-soporte.component';

describe('HeaderSoporteComponent', () => {
  let component: HeaderSoporteComponent;
  let fixture: ComponentFixture<HeaderSoporteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderSoporteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderSoporteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
