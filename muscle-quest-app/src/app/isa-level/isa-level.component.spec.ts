import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IsaLevelComponent } from './isa-level.component';

describe('IsaLevelComponent', () => {
  let component: IsaLevelComponent;
  let fixture: ComponentFixture<IsaLevelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IsaLevelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IsaLevelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
