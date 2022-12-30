import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SwiftData } from 'src/app/model/swift.model';

@Component({
  selector: 'swift-detail',
  templateUrl: './swift-detail.component.html',
  styleUrls: ['./swift-detail.component.scss']
})
export class SwiftDetailComponent implements OnInit {

  mode: string = 'new';
  modalTitle: string = '';
  previousLength = 0;
  isMultiLine = true;
  public swiftForm: FormGroup = new FormGroup({
    title: new FormControl(''),
    content: new FormControl('')
  });
  constructor(
    public dialogRef: MatDialogRef<SwiftDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: SwiftData,
  ) { }


  get swiftFormControls() {
    return this.swiftForm as FormGroup;
  }
  
  ngOnInit(): void {
    if (this.data.mode === 'new') {
      this.modalTitle = 'Add Swift Note';
    } else if (this.data.mode === 'view') {
      this.modalTitle = 'View Swift Note';
    }
    this.swiftForm.setValue({
      title: '',
      content: ''
    })
  }

  /**
   * on outside dialog click just close dialog
   */
  onNoClick(): void {
    this.dialogRef.close();
  }

  /**
   * on save capture form values and send it across to dialog ref
   */
  onSaveNote(): void {
    if (this.swiftForm.valid) {
      this.dialogRef.close({ note: this.swiftForm.value });
    }
  }
 
  /**
   * this function creates bullet points as we hit enter so the text area is formatted
   * @param event - text input from text area
   * @returns 
   */
 handleInput(event: any)  {
  if(!this.isMultiLine) return;
  const bullet = "\u2022";
  const newLength = event.target.value.length;
  const characterCode = event.target.value.substr(-1).charCodeAt(0);

  if (newLength > this.previousLength) {
    if (characterCode === 10) {
      event.target.value = `${event.target.value}${bullet} `;
    } else if (newLength === 1) {
      event.target.value = `${bullet} ${event.target.value}`;
    }
  }
  
  this.previousLength = newLength;
}

processContent(content:string){
  return content.replaceAll('\u2022','<br>\u2022')
}
}
