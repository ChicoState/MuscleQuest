import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrcBossComponent } from './orc-boss.component';

describe('OrcBossComponent', () => {
  let component: OrcBossComponent;
  let fixture: ComponentFixture<OrcBossComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrcBossComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrcBossComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
