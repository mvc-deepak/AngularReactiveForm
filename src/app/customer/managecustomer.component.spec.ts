import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagecustomerComponent } from './managecustomer.component';

describe('ManagecustomerComponent', () => {
  let component: ManagecustomerComponent;
  let fixture: ComponentFixture<ManagecustomerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagecustomerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagecustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
