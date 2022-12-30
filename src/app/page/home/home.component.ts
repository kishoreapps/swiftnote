import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SwiftDetailComponent } from 'src/app/common/swift-detail/swift-detail.component';
import { StorageService } from 'src/app/service/storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  
  gridData: any[] = [];
  dialogRef: any;

  constructor(public storage: StorageService, public dialog: MatDialog) {
    this.gridData = this.storage.getAllData();
  }

  /**
   * Open swift detail component with new context 
   * so we can add values to storage once validated content is sent back
   */
  openAddDialog() {
    this.dialogRef = this.dialog.open(SwiftDetailComponent, {
      data: { note: { title: '', content: '' }, mode: 'new' },
    });

    this.dialogRef.afterClosed().subscribe((res: any) => {
      if (res?.note) {
        this.storage.saveData(`swift-${new Date().getTime()}`, res?.note);
        this.gridData = this.storage.getAllData();
      }
    });
  }

  /**
   * on view note event - get the value from storage
   * open the dialog with swift note context
   * @param e 
   */
  viewNote(e: any) {
    if (e) {
      const noteDataValue = this.storage.getData(e)
      if (Object.keys(noteDataValue).length > 0) {
        this.dialogRef = this.dialog.open(SwiftDetailComponent, {
          data: { note: { title: noteDataValue.title, content: noteDataValue.content }, mode: 'view' },
        });
      }
    }
  }

}
