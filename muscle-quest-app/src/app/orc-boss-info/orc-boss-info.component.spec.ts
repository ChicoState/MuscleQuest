import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrcBossInfoComponent } from './orc-boss-info.component';

describe('OrcBossInfoComponent', () => {
  let component: OrcBossInfoComponent;
  let fixture: ComponentFixture<OrcBossInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrcBossInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrcBossInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
