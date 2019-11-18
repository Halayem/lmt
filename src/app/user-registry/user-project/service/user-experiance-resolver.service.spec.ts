import { TestBed } from '@angular/core/testing';

import { UserExperianceResolverService } from './user-experiance-resolver.service';

describe('UserExperianceResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UserExperianceResolverService = TestBed.get(UserExperianceResolverService);
    expect(service).toBeTruthy();
  });
});
