import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DecoratedButtonComponent } from './decorated-button.component';

describe('DecoratedButtonComponent', () => {
  let component: DecoratedButtonComponent;
  let fixture: ComponentFixture<DecoratedButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DecoratedButtonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DecoratedButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
