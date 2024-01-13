import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableroSoporteComponent } from './tablero-soporte.component';

describe('TableroSoporteComponent', () => {
  let component: TableroSoporteComponent;
  let fixture: ComponentFixture<TableroSoporteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableroSoporteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableroSoporteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
