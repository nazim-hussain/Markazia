import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRegisterAndSetupComponent } from './add-register-and-setup.component';

describe('AddRegisterAndSetupComponent', () => {
  let component: AddRegisterAndSetupComponent;
  let fixture: ComponentFixture<AddRegisterAndSetupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddRegisterAndSetupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddRegisterAndSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
