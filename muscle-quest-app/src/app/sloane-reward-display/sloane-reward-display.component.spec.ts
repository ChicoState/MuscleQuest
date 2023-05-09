import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SloaneRewardDisplayComponent } from './sloane-reward-display.component';
import { SloaneUserUpdateService } from '../sloane-user-updater.service';

class MockSloaneUserUpdateService {
  giveLootBundle(bundle: number[]) {
    return bundle;
  }
}

describe('SloaneRewardDisplayComponent', () => {
  let component: SloaneRewardDisplayComponent;
  let fixture: ComponentFixture<SloaneRewardDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SloaneRewardDisplayComponent],
      providers: [
        {
          provide: SloaneUserUpdateService,
          useClass: MockSloaneUserUpdateService,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SloaneRewardDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
