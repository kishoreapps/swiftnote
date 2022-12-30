import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SwiftDetailComponent } from './swift-detail.component';

describe('SwiftDetailComponent', () => {
  let component: SwiftDetailComponent;
  let fixture: ComponentFixture<SwiftDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SwiftDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SwiftDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
