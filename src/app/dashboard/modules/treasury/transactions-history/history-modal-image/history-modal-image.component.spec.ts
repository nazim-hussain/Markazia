import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryModalImageComponent } from './history-modal-image.component';

describe('HistoryModalImageComponent', () => {
  let component: HistoryModalImageComponent;
  let fixture: ComponentFixture<HistoryModalImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistoryModalImageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistoryModalImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
