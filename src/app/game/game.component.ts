import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddDialogComponent } from '../add-dialog/add-dialog.component';
import { Router } from '@angular/router';
import { EndDialogComponent } from '../end-dialog/end-dialog.component';
import { StoreDataService } from '../store-data.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnInit {
  constructor(
    public dialog: MatDialog,
    private router: Router,
    public sds: StoreDataService
  ) {}

  ngOnInit(): void {
    this.setGame();
  }

  setGame() {
    this.sds.getGameIdFromRoute();
    this.sds.loadGame();
    this.sds.resetStack();
    this.checkPlayer();

    setTimeout(() => {
      this.checkCardStack();
    }, 1000);
  }

  checkPlayer() {
    setTimeout(() => {
      if (this.sds.gameObject.players.length == 0) {
        this.openDialog();
      }
    }, 1000);
  }

  takeCard() {
    this.sds.gameObject.pickCardAnimation = true;
    this.popLastCard();
    this.setCurrentPlayer();
    this.sds.updateGame();
    this.checkCardStack();
  }

  checkCardStack() {
    let stackLength = this.sds.gameObject.stack.length;
    if (stackLength < 20 && stackLength >= 15) {
      this.sds.cardStack = [0, 1, 2, 3];
      this.sds.offset = 20;
    } else if (stackLength < 15 && stackLength >= 10) {
      this.sds.cardStack = [0, 1, 2];
      this.sds.offset = 15;
    } else if (stackLength < 10 && stackLength >= 5) {
      this.sds.cardStack = [0, 1];
      this.sds.offset = 10;
    } else if (stackLength < 5 && stackLength > 1) {
      this.sds.cardStack = [0];
      this.sds.offset = 5;
    } else if (stackLength == 1) {
      this.sds.noCards = true;
    } else if (stackLength == 0) {
      this.sds.noCards = true;
      this.sds.noTakeCard = true;
      this.endScreenDialog();
    }
  }

  setCurrentPlayer() {
    if (
      this.sds.gameObject.currentPlayer == this.sds.gameObject.players.length
    ) {
      this.sds.gameObject.currentPlayer = 1;
    } else {
      this.sds.gameObject.currentPlayer++;
    }
  }

  popLastCard() {
    this.sds.gameObject.currentCard = this.sds.gameObject.stack.pop();
    this.pushPlayedCard();
  }

  pushPlayedCard() {
    if (this.sds.gameObject.currentCard != undefined) {
      this.sds.gameObject.playedCards.push(this.sds.gameObject.currentCard);
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddDialogComponent);

    dialogRef.afterClosed().subscribe((name: string) => {
      if (name) {
        this.sds.gameObject.players.push(name);
        this.sds.updateGame();
      }
    });
  }

  backToMenu() {
    this.router.navigateByUrl('/');
  }

  endScreenDialog(): void {
    this.dialog.open(EndDialogComponent);
  }
}
