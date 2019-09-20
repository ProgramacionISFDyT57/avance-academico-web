import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignarLibroComponent } from './asignar-libro.component';

describe('AsignarLibroComponent', () => {
  let component: AsignarLibroComponent;
  let fixture: ComponentFixture<AsignarLibroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AsignarLibroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AsignarLibroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
