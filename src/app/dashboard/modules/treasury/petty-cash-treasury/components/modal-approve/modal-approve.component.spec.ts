import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalApproveComponent } from './modal-approve.component';

describe('ModalApproveComponent', () => {
  let component: ModalApproveComponent;
  let fixture: ComponentFixture<ModalApproveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalApproveComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalApproveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
