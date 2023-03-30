import { Injectable } from '@angular/core';
import { Game } from 'src/models/game';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { doc } from '@firebase/firestore';

@Injectable({
  providedIn: 'root',
})
export class StoreDataService {
  gameList: any = [];
  gameID: string = '';
  gameObject: Game = new Game();
  oldGameID: string = '';
  cardStack: number[] = [0, 1, 2, 3, 4];
  noCards: Boolean = false;
  noTakeCard: Boolean = false;
  offset: number = 25;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fireStore: AngularFirestore
  ) {}

  /**
   * creating a new game and redirecting to game url
   * @returns
   */
  async createGame() {
    const game: Game = new Game();
    return await this.fireStore
      .collection('games')
      .add(game.toJson())
      .then((g) => {
        this.router.navigateByUrl(`/game/${g.id}`);
      });
  }

  /**
   * fetching all games from firestore
   * @returns
   */
  async fetchGames() {
    const games$ = this.fireStore.collection('games').snapshotChanges();
    games$.subscribe((games) => {
      this.gameList = games.map((game) => {
        const id = game.payload.doc.id;
        const data = game.payload.doc.data() as Game;
        return { id, ...data };
      });
    });
  }

  /**
   * loading a game from firestore
   * @returns
   */
  async loadGame() {
    this.fireStore
      .collection('games')
      .doc(this.gameID)
      .valueChanges()
      .subscribe(async (game) => {
        return (this.gameObject = (await game) as Game);
      });
  }

  /**
   * updating a game in firestore
   * @returns
   */
  updateGame() {
    return this.fireStore
      .collection('games')
      .doc(this.gameID)
      .update(this.gameObject);
  }

  /**
   * deleting a game from firestore
   * @returns
   */
  deleteGame() {
    return this.fireStore.collection('games').doc(this.oldGameID).delete();
  }

  /**
   * getting gameID from url params
   */
  getGameIdFromRoute() {
    this.route.firstChild?.params.subscribe((params: any) => {
      this.gameID = params['id'];
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
