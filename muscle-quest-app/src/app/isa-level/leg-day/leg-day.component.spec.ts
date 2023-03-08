import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LegDayComponent } from './leg-day.component';

describe('LegDayComponent', () => {
  let component: LegDayComponent;
  let fixture: ComponentFixture<LegDayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LegDayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LegDayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
