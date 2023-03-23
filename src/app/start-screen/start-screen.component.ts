import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Game } from 'src/models/game';
import { inject } from '@angular/core';
import {
  Firestore,
  collectionData,
  collection,
  setDoc,
  doc,
  getDoc,
  deleteDoc,
  updateDoc,
  addDoc,
  docData,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-start-screen',
  templateUrl: './start-screen.component.html',
  styleUrls: ['./start-screen.component.scss'],
})
export class StartScreenComponent {
  games$: Observable<any>;
  game$!: Observable<any>;
  firestore: Firestore = inject(Firestore);
  public gameObject: Game = new Game();

  constructor(private router: Router) {
    const gameCollection = collection(this.firestore, 'games');
    this.games$ = collectionData(gameCollection, { idField: 'id' });
  }

  newGame() {
    this.addGame();
    this.router.navigateByUrl('/game');
  }

  async addGame() {
    const gameCollection = collection(this.firestore, 'games');
    await addDoc(gameCollection, JSON.parse(JSON.stringify(this.gameObject)));
  }

  loadGame(id: string) {
    const dbObject = doc(this.firestore, `games/${id}`);
    this.game$ = docData(dbObject, { idField: 'id' });
    this.game$.subscribe((game) => {
      this.gameObject = game;
    });

    this.router.navigateByUrl('/game');
  }
}
