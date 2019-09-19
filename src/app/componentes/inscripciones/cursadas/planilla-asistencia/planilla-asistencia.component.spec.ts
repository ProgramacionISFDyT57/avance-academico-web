import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanillaAsistenciaComponent } from './planilla-asistencia.component';

describe('PlanillaAsistenciaComponent', () => {
  let component: PlanillaAsistenciaComponent;
  let fixture: ComponentFixture<PlanillaAsistenciaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlanillaAsistenciaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanillaAsistenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
