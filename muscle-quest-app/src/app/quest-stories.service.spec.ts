import { TestBed } from '@angular/core/testing';

import { QuestStoriesService } from './quest-stories.service';

describe('QuestStoriesService', () => {
  let service: QuestStoriesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuestStoriesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
