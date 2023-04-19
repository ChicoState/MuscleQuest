import { TestBed } from '@angular/core/testing';

import { SloaneUserUpdaterService } from './sloane-user-updater.service';

describe('SloaneUserUpdaterService', () => {
  let service: SloaneUserUpdaterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SloaneUserUpdaterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
