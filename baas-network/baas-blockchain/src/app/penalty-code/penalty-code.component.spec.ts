import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PenaltyCodeComponent } from './penalty-code.component';

describe('PenaltyCodeComponent', () => {
  let component: PenaltyCodeComponent;
  let fixture: ComponentFixture<PenaltyCodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PenaltyCodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PenaltyCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
