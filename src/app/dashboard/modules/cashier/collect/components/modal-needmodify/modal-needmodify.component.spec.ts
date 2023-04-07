import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalNeedmodifyComponent } from './modal-needmodify.component';

describe('ModalNeedmodifyComponent', () => {
  let component: ModalNeedmodifyComponent;
  let fixture: ComponentFixture<ModalNeedmodifyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalNeedmodifyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalNeedmodifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
