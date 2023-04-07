import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDoneComponent } from './modal-done.component';

describe('ModalDoneComponent', () => {
  let component: ModalDoneComponent;
  let fixture: ComponentFixture<ModalDoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalDoneComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalDoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
