import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEditSetupComponent } from './modal-edit-setup.component';

describe('ModalEditSetupComponent', () => {
  let component: ModalEditSetupComponent;
  let fixture: ComponentFixture<ModalEditSetupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalEditSetupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalEditSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
