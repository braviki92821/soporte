import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnviarReporteAdminComponent } from './enviar-reporte-admin.component';

describe('EnviarReporteAdminComponent', () => {
  let component: EnviarReporteAdminComponent;
  let fixture: ComponentFixture<EnviarReporteAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnviarReporteAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnviarReporteAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
