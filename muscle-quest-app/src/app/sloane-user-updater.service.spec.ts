import { TestBed } from '@angular/core/testing';

import { SloaneUserUpdateService } from './sloane-user-updater.service';

describe('SloaneUserUpdaterService', () => {
  let service: SloaneUserUpdateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SloaneUserUpdateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
