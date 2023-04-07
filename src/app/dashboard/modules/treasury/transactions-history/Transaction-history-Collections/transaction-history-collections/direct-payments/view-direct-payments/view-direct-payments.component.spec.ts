import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewDirectPaymentsComponent } from './view-direct-payments.component';

describe('ViewDirectPaymentsComponent', () => {
  let component: ViewDirectPaymentsComponent;
  let fixture: ComponentFixture<ViewDirectPaymentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewDirectPaymentsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewDirectPaymentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
