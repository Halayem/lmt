import { TestBed } from '@angular/core/testing';

import { MocksBasicInformationsService } from './mocks-basic-informations.service';

describe('MocksBasicInformationsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MocksBasicInformationsService = TestBed.get(MocksBasicInformationsService);
    expect(service).toBeTruthy();
  });
});
