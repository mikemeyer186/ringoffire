import { Injectable } from '@angular/core';
import { Game } from 'src/models/game';
import { ActivatedRoute, Router } from '@angular/router';
import {
  Firestore,
  addDoc,
  collection,
  deleteDoc,
  doc,
  docData,
  getDocs,
  setDoc,
} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class StoreDataService {
  public gameList: any = [];
  public gameID: string = '';
  public gameObject: Game = new Game();
  public cardStack: number[] = [0, 1, 2, 3, 4];
  public noCards: Boolean = false;
  public noTakeCard: Boolean = false;
  public offset: number = 25;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private firestore: Firestore
  ) {}

  /**
   * creating a new game and redirecting to game url
   * @returns
   */
  async createGame() {
    debugger;
    const newGame: Game = new Game();
    await addDoc(collection(this.firestore, 'games'), newGame.toJson())
      .then((game) => {
        this.router.navigateByUrl('/game/' + game.id);
      })
      .then(() => {
        this.gameObject = newGame;
      });
  }

  /**
   * fetching all games from firestore
   * @returns
   */
  async fetchGames() {
    const querySnapshot = await getDocs(collection(this.firestore, 'games'));
    this.gameList = querySnapshot.docs.map((game) => {
      const id = game.id;
      const data = game.data() as Game;
      return { id, ...data };
    });
  }

  /**
   * loading a game from firestore
   * @returns
   */
  loadGame() {
    this.gameObject = new Game();
    const docRef = doc(this.firestore, `games/${this.gameID}`);
    docData(docRef).subscribe((game: any) => {
      this.gameObject = game as Game;
    });
  }

  /**
   * updating a game in firestore
   * @returns
   */
  async updateGame() {
    const docRef = doc(this.firestore, `games/${this.gameID}`);
    await setDoc(docRef, JSON.parse(JSON.stringify(this.gameObject)));
  }

  /**
   * deleting a game from firestore
   * @returns
   */
  deleteGame() {
    const docRef = doc(this.firestore, `games/${this.gameID}`);
    deleteDoc(docRef);
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
