import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanillaProfesoresComponent } from './planilla-profesores.component';

describe('PlanillaProfesoresComponent', () => {
  let component: PlanillaProfesoresComponent;
  let fixture: ComponentFixture<PlanillaProfesoresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlanillaProfesoresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanillaProfesoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
