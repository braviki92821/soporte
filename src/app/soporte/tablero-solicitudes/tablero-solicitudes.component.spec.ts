import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableroSolicitudesComponent } from './tablero-solicitudes.component';

describe('TableroSolicitudesComponent', () => {
  let component: TableroSolicitudesComponent;
  let fixture: ComponentFixture<TableroSolicitudesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableroSolicitudesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableroSolicitudesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
