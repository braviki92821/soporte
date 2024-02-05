import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableroAtencionComponent } from './tablero-atencion.component';

describe('TableroAtencionComponent', () => {
  let component: TableroAtencionComponent;
  let fixture: ComponentFixture<TableroAtencionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableroAtencionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableroAtencionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
