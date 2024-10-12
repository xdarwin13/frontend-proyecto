import { TestBed } from '@angular/core/testing';

import { AuthestudiantesService } from './authestudiantes.service';

describe('AuthestudiantesService', () => {
  let service: AuthestudiantesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthestudiantesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
