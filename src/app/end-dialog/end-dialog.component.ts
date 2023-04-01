import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { StoreDataService } from '../store-data.service';

@Component({
  selector: 'app-end-dialog',
  templateUrl: './end-dialog.component.html',
  styleUrls: ['./end-dialog.component.scss'],
})
export class EndDialogComponent implements OnInit {
  endScreenClick: Boolean = false;

  constructor(
    private router: Router,
    public dialogRef: MatDialogRef<EndDialogComponent>,
    public sds: StoreDataService
  ) {}

  ngOnInit(): void {
    this.sds.oldGameID = this.sds.gameID;
  }

  newGame() {
    this.endScreenClick = true;
    this.sds.createGame();
    this.sds.resetStack();
    this.deleteOldGame();
  }

  deleteOldGame() {
    setTimeout(() => {
      this.sds.deleteGame(this.sds.oldGameID);
    }, 2000);
  }

  backToMenu() {
    this.endScreenClick = true;
    this.sds.deleteGame(this.sds.oldGameID);
    this.router.navigateByUrl('/');
  }
}
