import { Component, Input } from '@angular/core';
import { Game } from 'src/models/game';

@Component({
  selector: 'app-player-list',
  templateUrl: './player-list.component.html',
  styleUrls: ['./player-list.component.scss'],
})
export class PlayerListComponent {
  game: Game = new Game();
}
