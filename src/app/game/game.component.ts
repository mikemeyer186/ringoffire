import { Component, OnInit } from '@angular/core';
import { Game } from 'src/models/game';
import { MatDialog } from '@angular/material/dialog';
import { AddDialogComponent } from '../add-dialog/add-dialog.component';
import { ActivatedRoute } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
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
import { EndDialogComponent } from '../end-dialog/end-dialog.component';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnInit {
  gameObject: Game = new Game();
  game$!: Observable<any>;
  firestore: Firestore = inject(Firestore);
  gameID: string = '';
  cardStack: number[] = [0, 1, 2, 3, 4];
  noCards: Boolean = false;
  noTakeCard: Boolean = false;
  offset: number = 25;

  constructor(
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((param) => {
      this.gameID = param['id'];
      this.loadGame();
    });
  }

  async loadGame() {
    this.resetStack();
    const dbObject = doc(this.firestore, `games/${this.gameID}`);
    this.game$ = docData(dbObject, { idField: 'id' });
    this.game$.subscribe((game) => {
      this.gameObject = game;
      console.log(this.gameObject);
    });
    setTimeout(() => {
      this.checkCardStack();
    }, 1000);
  }

  resetStack() {
    this.noCards = false;
    this.noTakeCard = false;
    this.cardStack = [0, 1, 2, 3, 4];
    this.offset = 25;
    this.gameObject.pickCardAnimation = false;
  }

  async gameUpdate() {
    const dbObject = doc(this.firestore, `games/${this.gameID}`);
    await updateDoc(dbObject, JSON.parse(JSON.stringify(this.gameObject)));
  }

  takeCard() {
    this.gameObject.pickCardAnimation = true;
    this.popLastCard();
    this.setCurrentPlayer();
    this.gameUpdate();
    this.checkCardStack();
  }

  checkCardStack() {
    let stackLength = this.gameObject.stack.length;
    if (stackLength < 20 && stackLength >= 15) {
      this.cardStack = [0, 1, 2, 3];
      this.offset = 20;
    } else if (stackLength < 15 && stackLength >= 10) {
      this.cardStack = [0, 1, 2];
      this.offset = 15;
    } else if (stackLength < 10 && stackLength >= 5) {
      this.cardStack = [0, 1];
      this.offset = 10;
    } else if (stackLength < 5 && stackLength > 1) {
      this.cardStack = [0];
      this.offset = 5;
    } else if (stackLength == 1) {
      this.noCards = true;
    } else if (stackLength == 0) {
      this.noTakeCard = true;
      this.endScreenDialog();
    }
  }

  setCurrentPlayer() {
    if (this.gameObject.currentPlayer == this.gameObject.players.length) {
      this.gameObject.currentPlayer = 1;
    } else {
      this.gameObject.currentPlayer++;
    }
  }

  popLastCard() {
    this.gameObject.currentCard = this.gameObject.stack.pop();
    this.pushPlayedCard();
  }

  pushPlayedCard() {
    if (this.gameObject.currentCard != undefined) {
      this.gameObject.playedCards.push(this.gameObject.currentCard);
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddDialogComponent);

    dialogRef.afterClosed().subscribe((name: string) => {
      if (name) {
        this.gameObject.players.push(name);
        this.gameUpdate();
      }
    });
  }

  backToMenu() {
    this.router.navigateByUrl('/');
  }

  endScreenDialog(): void {
    this.dialog.open(EndDialogComponent);
  }
}
