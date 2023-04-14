import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionCardPaymentsComponent } from './session-card-payments.component';

describe('SessionCardPaymentsComponent', () => {
  let component: SessionCardPaymentsComponent;
  let fixture: ComponentFixture<SessionCardPaymentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SessionCardPaymentsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SessionCardPaymentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
