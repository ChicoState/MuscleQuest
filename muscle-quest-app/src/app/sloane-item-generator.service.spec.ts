import { TestBed } from '@angular/core/testing';

import { SloaneItemGeneratorService } from './sloane-item-generator.service';

describe('SloaneItemGeneratorService', () => {
  let service: SloaneItemGeneratorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SloaneItemGeneratorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
