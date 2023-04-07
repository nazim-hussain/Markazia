import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PettyCashTreasuryComponent } from './petty-cash-treasury.component';

describe('PettyCashTreasuryComponent', () => {
  let component: PettyCashTreasuryComponent;
  let fixture: ComponentFixture<PettyCashTreasuryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PettyCashTreasuryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PettyCashTreasuryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
