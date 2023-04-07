import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StoreDataService } from '../store-data.service';

@Component({
  selector: 'app-load-dialog',
  templateUrl: './load-dialog.component.html',
  styleUrls: ['./load-dialog.component.scss'],
})
export class LoadDialogComponent implements OnInit {
  loadedGame: Boolean = false;
  noGames: Boolean = false;

  constructor(private router: Router, public sds: StoreDataService) {}

  ngOnInit(): void {
    this.loadGameList();
  }

  /**
   * loading all games from firebase as a list
   */
  loadGameList() {
    this.sds.fetchGames();
    this.checkGameList();
  }

  /**
   * checking if games list = 0, then sets "noGames" for showing info in load dialog
   */
  checkGameList() {
    if (this.sds.gameList.length == 0) {
      this.noGames = true;
    }
  }

  /**
   * loading existing game with id
   * @param id - id of game
   */
  loadGame(id: string) {
    this.loadedGame = true;
    this.router.navigateByUrl(`/game/${id}`);
  }
}
