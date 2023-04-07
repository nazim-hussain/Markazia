import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectPaymentsComponent } from './direct-payments.component';

describe('DirectPaymentsComponent', () => {
  let component: DirectPaymentsComponent;
  let fixture: ComponentFixture<DirectPaymentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DirectPaymentsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DirectPaymentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
