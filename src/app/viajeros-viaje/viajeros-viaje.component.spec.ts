import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViajerosViajeComponent } from './viajeros-viaje.component';

describe('ViajerosViajeComponent', () => {
  let component: ViajerosViajeComponent;
  let fixture: ComponentFixture<ViajerosViajeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViajerosViajeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViajerosViajeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
