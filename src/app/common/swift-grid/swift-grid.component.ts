import {
  BreakpointObserver,
  Breakpoints
} from '@angular/cdk/layout';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { merge, Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Component({
  selector: 'swift-grid',
  templateUrl: './swift-grid.component.html',
  styleUrls: ['./swift-grid.component.scss']
})
export class SwiftGridComponent implements OnInit {
  cardsLayout: Observable<any>;
  @Input() gridData: any[] = [];
  @Output() noteClickEvent = new EventEmitter<string>();

  checkboxData: any[] = [];

  constructor(public breakpointObserver: BreakpointObserver) {
    // responsive using cdk layout
    this.cardsLayout = merge(
      this.breakpointObserver.observe([Breakpoints.Handset, Breakpoints.XSmall, Breakpoints.Small]).pipe(
        map(({ matches }) => {
          if (matches) {
            return { cols: 1, rows: 1, gridColumns: 1 };
          }
          return { cols: 1, rows: 1, gridColumns: 1 };
        })),
      this.breakpointObserver.observe(Breakpoints.Tablet).pipe(
        map(({ matches }) => {
          if (matches) {
            return { cols: 2, rows: 1, gridColumns: 4 };
          }
          return { cols: 1, rows: 1, gridColumns: 1 };
        })),
      this.breakpointObserver.observe(Breakpoints.Web).pipe(
        map(({ matches }) => {
          if (matches) {
            return { cols: 2, rows: 1, gridColumns: 6 };
          }
          return { cols: 1, rows: 1, gridColumns: 1 };
        }))
    );
  }

  ngOnInit() {
  }

  /**
   * when user clicks on card publish swift note id
   * @param id - id of swift note
   */
  viewNote(id: string) {
    this.noteClickEvent.emit(id);
  }

  /**
   * process bullet point text in a formatted way
   * @param content - text content
   * @returns 
   */
  processContent(content:string){
    return content.replaceAll('\u2022','<br>\u2022').substring(10)
  }

  setAll(i: any, state: boolean) {
    this.checkboxData[i] = state;
  }
}


