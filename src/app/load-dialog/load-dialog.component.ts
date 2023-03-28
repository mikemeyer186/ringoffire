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

  loadGameList() {
    this.sds.fetchGames();
  }

  loadGame(id: string) {
    this.loadedGame = true;
    this.router.navigateByUrl(`/game/${id}`);
  }
}
