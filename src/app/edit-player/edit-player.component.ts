import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-player',
  templateUrl: './edit-player.component.html',
  styleUrls: ['./edit-player.component.scss'],
})
export class EditPlayerComponent {
  name: string = '';
  playerImages = ['profil_f.png', 'profil_m.png'];

  constructor(public dialogRef: MatDialogRef<EditPlayerComponent>) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
