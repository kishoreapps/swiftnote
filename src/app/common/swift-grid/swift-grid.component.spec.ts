import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SwiftGridComponent } from './swift-grid.component';

describe('SwiftGridComponent', () => {
  let component: SwiftGridComponent;
  let fixture: ComponentFixture<SwiftGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SwiftGridComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SwiftGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should set checbox and validate strikethrough class added', () => {
    component.setAll(0,true);
    const compiled = fixture.debugElement.nativeElement; 
   console.log(compiled)


  });
});
