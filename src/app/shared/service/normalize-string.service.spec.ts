import { TestBed } from '@angular/core/testing';

import { NormalizeStringService } from './normalize-string.service';

describe('NormalizeStringService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NormalizeStringService = TestBed.get(NormalizeStringService);
    expect(service).toBeTruthy();
  });
});
