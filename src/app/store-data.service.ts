import { Injectable } from '@angular/core';
import { inject } from '@angular/core';
import { Game } from 'src/models/game';
import {
  Firestore,
  doc,
  deleteDoc,
  collection,
  addDoc,
  collectionData,
} from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StoreDataService {
  oldGameID: string = '';
  games$: Observable<any>;
  firestore: Firestore = inject(Firestore);
  gameObject: Game = new Game();

  constructor(private router: Router, private route: ActivatedRoute) {
    const gameCollection = collection(this.firestore, 'games');
    this.games$ = collectionData(gameCollection, { idField: 'id' });
  }

  async newGame() {
    const gameCollection = collection(this.firestore, 'games');
    await addDoc(gameCollection, this.gameObject.toJson()).then((game) => {
      this.loadGame(game.id);
    });
  }

  loadGame(id: string) {
    this.router.navigateByUrl(`/game/${id}`);
  }

  async deleteGame() {
    this.getOldIdFromRoute();
    const dbObject = doc(this.firestore, `games/${this.oldGameID}`);
    await deleteDoc(dbObject);
  }

  getOldIdFromRoute() {
    this.route.firstChild?.params.subscribe((params: any) => {
      this.oldGameID = params['id'];
    });
  }
}
