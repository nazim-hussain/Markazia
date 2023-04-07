import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleDoneComponent } from './role-done.component';

describe('RoleDoneComponent', () => {
  let component: RoleDoneComponent;
  let fixture: ComponentFixture<RoleDoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoleDoneComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoleDoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
