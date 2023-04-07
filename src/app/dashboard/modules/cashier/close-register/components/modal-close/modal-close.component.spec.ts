import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCloseComponent } from './modal-close.component';

describe('ModalCloseComponent', () => {
  let component: ModalCloseComponent;
  let fixture: ComponentFixture<ModalCloseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalCloseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalCloseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
