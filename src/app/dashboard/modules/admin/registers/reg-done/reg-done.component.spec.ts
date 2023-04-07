import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegDoneComponent } from './reg-done.component';

describe('RegDoneComponent', () => {
  let component: RegDoneComponent;
  let fixture: ComponentFixture<RegDoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegDoneComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegDoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
