import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MensajesReporteComponent } from './mensajes-reporte.component';

describe('MensajesReporteComponent', () => {
  let component: MensajesReporteComponent;
  let fixture: ComponentFixture<MensajesReporteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MensajesReporteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MensajesReporteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
