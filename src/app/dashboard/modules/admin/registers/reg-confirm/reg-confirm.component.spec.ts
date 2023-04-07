import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegConfirmComponent } from './reg-confirm.component';

describe('RegConfirmComponent', () => {
  let component: RegConfirmComponent;
  let fixture: ComponentFixture<RegConfirmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegConfirmComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
