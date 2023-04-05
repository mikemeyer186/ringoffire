import { Injectable } from '@angular/core';
import { Game } from 'src/models/game';
import { ActivatedRoute, Router } from '@angular/router';
import {
  Firestore,
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  setDoc,
} from '@angular/fire/firestore';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StoreDataService {
  public gameList: any = [];
  public gameID: string = '';
  public oldGameID: string = '';
  public gameobject: Game = new Game();
  public cardStack: number[] = [0, 1, 2, 3, 4];
  public noCards: Boolean = false;
  public noTakeCard: Boolean = false;
  public offset: number = 25;
  public editPlayerID: number = 0;
  public gameUpdate$ = new Subject();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private firestore: Firestore
  ) {}

  /**
   * creating a new game and redirecting to game url
   */
  async createGame() {
    const newGame: Game = new Game();
    await addDoc(collection(this.firestore, 'games'), newGame.toJson()).then(
      (game) => {
        this.gameobject = newGame as Game;
        this.router.navigateByUrl(`/game/${game.id}`);
      }
    );
  }

  /**
   * fetching all games from firestore
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
   */
  async loadGame() {
    this.gameobject = new Game();
    const docRef = doc(this.firestore, 'games', this.gameID);
    const docSnap = await getDoc(docRef);
    this.gameobject = docSnap.data() as Game;
  }

  /**
   * getting real-time updates of game from firestore
   */
  updateFromDatabase() {
    const docRef = doc(this.firestore, 'games', this.gameID);
    onSnapshot(docRef, (game) => {
      if (game.exists()) {
        this.gameobject = game.data() as Game;
        this.gameUpdate$.next(this.gameobject.stack.length);
      }
    });
  }

  /**
   * updating a game in firestore
   */
  async updateGame() {
    const docRef = doc(this.firestore, `games/${this.gameID}`);
    await setDoc(docRef, JSON.parse(JSON.stringify(this.gameobject)));
  }

  /**
   * deleting a game from firestore
   */
  deleteGame(id: string) {
    const docRef = doc(this.firestore, `games/${id}`);
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
    this.gameobject.pickCardAnimation = false;
  }
}
