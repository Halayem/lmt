import { TestBed } from '@angular/core/testing';

import { UserExperiancenceService } from './user-experiancence.service';

describe('UserExperiancenceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UserExperiancenceService = TestBed.get(UserExperiancenceService);
    expect(service).toBeTruthy();
  });
});
