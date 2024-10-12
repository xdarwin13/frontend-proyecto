import { TestBed } from '@angular/core/testing';

import { AsistenciaEstudianteService } from './asistencia-estudiante.service';

describe('AsistenciaEstudianteService', () => {
  let service: AsistenciaEstudianteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AsistenciaEstudianteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
