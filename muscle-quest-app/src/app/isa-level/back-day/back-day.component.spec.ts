import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackDayComponent } from './back-day.component';

describe('BackDayComponent', () => {
  let component: BackDayComponent;
  let fixture: ComponentFixture<BackDayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BackDayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BackDayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
