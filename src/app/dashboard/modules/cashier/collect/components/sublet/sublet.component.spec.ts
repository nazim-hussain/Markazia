import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubletComponent } from './sublet.component';

describe('SubletComponent', () => {
  let component: SubletComponent;
  let fixture: ComponentFixture<SubletComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubletComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
