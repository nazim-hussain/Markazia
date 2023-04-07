import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectChequeComponent } from './collect-cheque.component';

describe('CollectChequeComponent', () => {
  let component: CollectChequeComponent;
  let fixture: ComponentFixture<CollectChequeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CollectChequeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CollectChequeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
