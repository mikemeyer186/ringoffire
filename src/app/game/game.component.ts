import { Component, OnInit } from '@angular/core';
import { Game } from 'src/models/game';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnInit {
  pickCardAnimation = false;
  currentCard: string = '';
  stackLength: number = 0;
  game: Game = new Game();

  ngOnInit(): void {
    this.newGame();
  }

  takeCard() {
    this.stackLength = this.game.stack.length - 1;
    this.currentCard = this.game.stack[this.stackLength];
    this.game.stack.splice(this.stackLength, 1);
    this.game.playedCards.push(this.currentCard);
    this.pickCardAnimation = true;
  }

  newGame() {
    console.log(this.game);
  }
}
