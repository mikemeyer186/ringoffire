import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Game } from 'src/models/game';
import { inject } from '@angular/core';
import {
  Firestore,
  collectionData,
  collection,
  addDoc,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { LoadDialogComponent } from '../load-dialog/load-dialog.component';

@Component({
  selector: 'app-start-screen',
  templateUrl: './start-screen.component.html',
  styleUrls: ['./start-screen.component.scss'],
})
export class StartScreenComponent {
  games$: Observable<any>;
  firestore: Firestore = inject(Firestore);
  gameObject: Game = new Game();

  constructor(private router: Router, public dialog: MatDialog) {
    const gameCollection = collection(this.firestore, 'games');
    this.games$ = collectionData(gameCollection, { idField: 'id' });
  }

  newGame() {
    this.addGame();
  }

  async addGame() {
    const gameCollection = await collection(this.firestore, 'games');
    await addDoc(gameCollection, this.gameObject.toJson()).then((game) => {
      this.loadGame(game.id);
    });
  }

  openLoadDialog(): void {
    this.dialog.open(LoadDialogComponent);
  }

  loadGame(id: string) {
    this.router.navigateByUrl(`/game/${id}`);
  }
}
