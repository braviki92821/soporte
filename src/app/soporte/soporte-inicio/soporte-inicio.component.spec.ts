import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoporteInicioComponent } from './soporte-inicio.component';

describe('SoporteInicioComponent', () => {
  let component: SoporteInicioComponent;
  let fixture: ComponentFixture<SoporteInicioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SoporteInicioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SoporteInicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
