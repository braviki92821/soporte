import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MensajesSoporteComponent } from './mensajes-soporte.component';

describe('MensajesSoporteComponent', () => {
  let component: MensajesSoporteComponent;
  let fixture: ComponentFixture<MensajesSoporteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MensajesSoporteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MensajesSoporteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
