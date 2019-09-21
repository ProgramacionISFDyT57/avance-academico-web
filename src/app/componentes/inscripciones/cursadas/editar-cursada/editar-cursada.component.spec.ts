import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarCursadaComponent } from './editar-cursada.component';

describe('EditarCursadaComponent', () => {
  let component: EditarCursadaComponent;
  let fixture: ComponentFixture<EditarCursadaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarCursadaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarCursadaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
