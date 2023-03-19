import { Component, OnInit } from '@angular/core';
import { Game } from 'src/models/game';
import { MatDialog } from '@angular/material/dialog';
import { AddDialogComponent } from '../add-dialog/add-dialog.component';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnInit {
  pickCardAnimation = false;
  currentCard: string | undefined = '';
  stackLength: number = 0;
  game: Game = new Game();

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {}

  takeCard() {
    this.pickCardAnimation = true;
    this.popLastCard();
    this.setCurrentPlayer();
  }

  setCurrentPlayer() {
    if (this.game.currentPlayer == this.game.players.length) {
      this.game.currentPlayer = 1;
    } else {
      this.game.currentPlayer++;
    }
  }

  popLastCard() {
    if (this.game.stack.length > 0) {
      this.currentCard = this.game.stack.pop();
      this.pushPlayedCard();
    }
  }

  pushPlayedCard() {
    if (this.currentCard != undefined) {
      this.game.playedCards.push(this.currentCard);
    }
  }

  logGame() {
    console.log(this.game);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddDialogComponent);

    dialogRef.afterClosed().subscribe((name: string) => {
      if (name) {
        this.game.players.push(name);
      }
    });
  }
}
