import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpeningRegisterComponent } from './opening-register.component';

describe('OpeningRegisterComponent', () => {
  let component: OpeningRegisterComponent;
  let fixture: ComponentFixture<OpeningRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpeningRegisterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OpeningRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
