import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestRutaComponent } from './request-ruta.component';

describe('RequestRutaComponent', () => {
  let component: RequestRutaComponent;
  let fixture: ComponentFixture<RequestRutaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestRutaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestRutaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
