import { TestBed } from '@angular/core/testing';

import { UserProjectResolverService } from './user-project-resolver.service';

describe('UserProjectResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UserProjectResolverService = TestBed.get(UserProjectResolverService);
    expect(service).toBeTruthy();
  });
});
