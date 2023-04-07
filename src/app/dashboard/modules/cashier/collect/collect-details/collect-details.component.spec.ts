import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectDetailsComponent } from './collect-details.component';

describe('CollectDetailsComponent', () => {
  let component: CollectDetailsComponent;
  let fixture: ComponentFixture<CollectDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CollectDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CollectDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
