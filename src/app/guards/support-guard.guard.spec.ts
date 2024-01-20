import { TestBed } from '@angular/core/testing';

import { SupportGuardGuard } from './support-guard.guard';

describe('SupportGuardGuard', () => {
  let guard: SupportGuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(SupportGuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
