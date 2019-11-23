import { TestBed } from '@angular/core/testing';

import { ProfileCollaborateur } from './profile-collaborateur.service';

describe('ProfileCollaborateur', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProfileCollaborateur = TestBed.get(ProfileCollaborateur);
    expect(service).toBeTruthy();
  });
});
