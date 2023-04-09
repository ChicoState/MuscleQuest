import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyQuestsComponent } from './daily-quests.component';

describe('DailyQuestsComponent', () => {
  let component: DailyQuestsComponent;
  let fixture: ComponentFixture<DailyQuestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DailyQuestsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DailyQuestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
