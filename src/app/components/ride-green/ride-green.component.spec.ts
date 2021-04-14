import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RideGreenComponent } from './ride-green.component';

describe('RideGreenComponent', () => {
  let component: RideGreenComponent;
  let fixture: ComponentFixture<RideGreenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RideGreenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RideGreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
