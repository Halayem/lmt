import { TestBed } from '@angular/core/testing';

import { UserAuthentificationService } from './user-authentification.service';

describe('UserAuthentificationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UserAuthentificationService = TestBed.get(UserAuthentificationService);
    expect(service).toBeTruthy();
  });
});
