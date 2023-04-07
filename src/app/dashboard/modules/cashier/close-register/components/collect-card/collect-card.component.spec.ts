import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectCardComponent } from './collect-card.component';

describe('CollectCardComponent', () => {
  let component: CollectCardComponent;
  let fixture: ComponentFixture<CollectCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CollectCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CollectCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
