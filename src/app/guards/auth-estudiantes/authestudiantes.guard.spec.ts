import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { authestudiantesGuard } from './authestudiantes.guard';

describe('authestudiantesGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => authestudiantesGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
