import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { StoreDataService } from '../store-data.service';

@Component({
  selector: 'app-end-dialog',
  templateUrl: './end-dialog.component.html',
  styleUrls: ['./end-dialog.component.scss'],
})
export class EndDialogComponent {
  endScreenClick: Boolean = false;

  constructor(
    private router: Router,
    public dialogRef: MatDialogRef<EndDialogComponent>,
    public sds: StoreDataService
  ) {}

  newGame() {
    this.endScreenClick = true;
    this.sds.newGame();
    this.sds.resetStack();
    //this.sds.deleteGame();
  }

  backToMenu() {
    this.endScreenClick = true;
    this.sds.deleteGame();
    this.router.navigateByUrl('/');
    this.dialogRef.close();
  }
}
