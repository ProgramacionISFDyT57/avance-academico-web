import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss']
})
export class ConfirmationDialogComponent implements OnInit {

  title: string;
  message: string;
  btnOkText: string;
  btnCancelText: string;

  constructor(
    public matDialogRef: MatDialogRef<ConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,
  ) {
    this.title = this.data.title;
    this.message = this.data.message;
    this.btnOkText = this.data.btnOkText || 'Si';
    this.btnCancelText = this.data.btnCancelText || 'No';
  }

  ngOnInit() {
  }

}
