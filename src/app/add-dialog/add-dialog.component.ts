import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-dialog',
  templateUrl: './add-dialog.component.html',
  styleUrls: ['./add-dialog.component.scss'],
})
export class AddDialogComponent {
  name: string = '';

  constructor(public dialogRef: MatDialogRef<AddDialogComponent>) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
