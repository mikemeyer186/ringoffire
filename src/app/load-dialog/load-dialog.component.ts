import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { Firestore, collectionData, collection } from '@angular/fire/firestore';

@Component({
  selector: 'app-load-dialog',
  templateUrl: './load-dialog.component.html',
  styleUrls: ['./load-dialog.component.scss'],
})
export class LoadDialogComponent {
  games$: Observable<any>;
  firestore: Firestore = inject(Firestore);
  loadedGame: Boolean = false;
  noGames: Boolean = false;

  constructor(private router: Router) {
    const gameCollection = collection(this.firestore, 'games');
    this.games$ = collectionData(gameCollection, { idField: 'id' });
    this.games$.subscribe((game) => {
      if (game.length == 0) {
        this.noGames = true;
      }
    });
  }

  loadGame(id: string) {
    this.loadedGame = true;
    this.router.navigateByUrl(`/game/${id}`);
  }
}
