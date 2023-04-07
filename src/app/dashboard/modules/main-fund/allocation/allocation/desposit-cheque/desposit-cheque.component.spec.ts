import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DespositChequeComponent } from './desposit-cheque.component';

describe('DespositChequeComponent', () => {
  let component: DespositChequeComponent;
  let fixture: ComponentFixture<DespositChequeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DespositChequeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DespositChequeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
