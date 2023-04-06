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
  newStack: string[] = [];

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
    this.sds.gameobject.currentCard = '';
    this.sds.gameobject.playedCards = [];
    this.createNewStack();
    this.sds.resetStack();
    this.sds.updateGame();
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

  public createNewStack() {
    for (let i = 1; i < 14; i++) {
      this.sds.gameobject.stack.push('s' + i);
      this.sds.gameobject.stack.push('h' + i);
      this.sds.gameobject.stack.push('c' + i);
      this.sds.gameobject.stack.push('d' + i);
    }

    this.randomize(this.sds.gameobject.stack);
  }

  randomize(array: string[]) {
    let index = array.length,
      randomIndex;

    while (index != 0) {
      randomIndex = Math.floor(Math.random() * index);
      index--;

      [array[index], array[randomIndex]] = [array[randomIndex], array[index]];
    }

    return array;
  }
}
