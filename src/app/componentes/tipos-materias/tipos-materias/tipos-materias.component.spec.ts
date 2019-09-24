import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TiposMateriasComponent } from './tipos-materias.component';

describe('TiposMateriasComponent', () => {
  let component: TiposMateriasComponent;
  let fixture: ComponentFixture<TiposMateriasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TiposMateriasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TiposMateriasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
