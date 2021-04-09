import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RideAndDeliverComponent } from './ride-and-deliver.component';

describe('RideAndDeliverComponent', () => {
  let component: RideAndDeliverComponent;
  let fixture: ComponentFixture<RideAndDeliverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RideAndDeliverComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RideAndDeliverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
