import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilSoporteComponent } from './perfil-soporte.component';

describe('PerfilSoporteComponent', () => {
  let component: PerfilSoporteComponent;
  let fixture: ComponentFixture<PerfilSoporteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PerfilSoporteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PerfilSoporteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
