import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionChequesComponent } from './session-cheques.component';

describe('SessionChequesComponent', () => {
  let component: SessionChequesComponent;
  let fixture: ComponentFixture<SessionChequesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SessionChequesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SessionChequesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
