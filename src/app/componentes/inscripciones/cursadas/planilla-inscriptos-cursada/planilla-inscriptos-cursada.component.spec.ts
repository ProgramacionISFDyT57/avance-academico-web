import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanillaInscriptosCursadaComponent } from './planilla-inscriptos-cursada.component';

describe('PlanillaInscriptosCursadaComponent', () => {
  let component: PlanillaInscriptosCursadaComponent;
  let fixture: ComponentFixture<PlanillaInscriptosCursadaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlanillaInscriptosCursadaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanillaInscriptosCursadaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
