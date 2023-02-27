import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SloaneLvlOneComponent } from './sloane-lvl-one.component';

describe('SloaneLvlOneComponent', () => {
  let component: SloaneLvlOneComponent;
  let fixture: ComponentFixture<SloaneLvlOneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SloaneLvlOneComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SloaneLvlOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
