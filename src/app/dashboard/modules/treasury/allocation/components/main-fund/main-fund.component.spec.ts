import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainFundComponent } from './main-fund.component';

describe('MainFundComponent', () => {
  let component: MainFundComponent;
  let fixture: ComponentFixture<MainFundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainFundComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainFundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
