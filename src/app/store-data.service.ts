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
  onSnapshot,
  updateDoc,
} from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StoreDataService {
  gameID: string = '';
  oldGameID: string = '';
  games$: Observable<any>;
  firestore: Firestore = inject(Firestore);
  gameObject: Game = new Game();
  cardStack: number[] = [0, 1, 2, 3, 4];
  noCards: Boolean = false;
  noTakeCard: Boolean = false;
  offset: number = 25;

  constructor(private router: Router, private route: ActivatedRoute) {
    const gameCollection = collection(this.firestore, 'games');
    this.games$ = collectionData(gameCollection, { idField: 'id' });
  }

  /**
   * adding a new doc to firestore and redirects to game with new game id
   */
  async newGame() {
    this.gameObject = new Game();
    const gameCollection = collection(this.firestore, 'games');
    await addDoc(gameCollection, this.gameObject.toJson()).then((game) => {
      this.router.navigateByUrl(`/game/${game.id}`);
    });
  }

  /**
   * loading game data from firestore
   */
  async loadGame() {
    const dbObject = doc(this.firestore, `games/${this.gameID}`);
    onSnapshot(dbObject, async (doc: any) => {
      this.gameObject = await doc.data();
    });
  }

  /**
   * updating game data in firestore
   */
  async gameUpdate() {
    const dbObject = doc(this.firestore, `games/${this.gameID}`);
    await updateDoc(dbObject, JSON.parse(JSON.stringify(this.gameObject)));
  }

  /**
   * deleting old game from firestore with old gameID
   */
  async deleteGame() {
    this.getOldIdFromRoute();
    const oldGameObject = doc(this.firestore, `games/${this.oldGameID}`);
    await deleteDoc(oldGameObject);
  }

  /**
   * getting gameID from url params
   */
  getGameIdFromRoute() {
    this.route.firstChild?.params.subscribe((param) => {
      this.gameID = param['id'];
      this.loadGame();
    });
  }

  /**
   * getting old gameID from url params
   */
  getOldIdFromRoute() {
    this.route.firstChild?.params.subscribe((params: any) => {
      this.oldGameID = params['id'];
    });
  }

  /**
   * resetting the stack visuals
   */
  resetStack() {
    this.noCards = false;
    this.noTakeCard = false;
    this.cardStack = [0, 1, 2, 3, 4];
    this.offset = 25;
    this.gameObject.pickCardAnimation = false;
  }
}
