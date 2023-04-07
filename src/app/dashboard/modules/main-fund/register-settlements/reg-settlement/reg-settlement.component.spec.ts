import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegSettlementComponent } from './reg-settlement.component';

describe('RegSettlementComponent', () => {
  let component: RegSettlementComponent;
  let fixture: ComponentFixture<RegSettlementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegSettlementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegSettlementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
