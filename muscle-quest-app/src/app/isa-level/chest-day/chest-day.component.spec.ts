import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChestDayComponent } from './chest-day.component';

describe('ChestDayComponent', () => {
  let component: ChestDayComponent;
  let fixture: ComponentFixture<ChestDayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChestDayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChestDayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
