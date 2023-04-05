import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SloaneRewardDisplayComponent } from './sloane-reward-display.component';

describe('SloaneRewardDisplayComponent', () => {
  let component: SloaneRewardDisplayComponent;
  let fixture: ComponentFixture<SloaneRewardDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SloaneRewardDisplayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SloaneRewardDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
