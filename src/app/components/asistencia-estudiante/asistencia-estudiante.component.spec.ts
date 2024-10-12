import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsistenciaEstudianteComponent } from './asistencia-estudiante.component';

describe('AsistenciaEstudianteComponent', () => {
  let component: AsistenciaEstudianteComponent;
  let fixture: ComponentFixture<AsistenciaEstudianteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AsistenciaEstudianteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AsistenciaEstudianteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
