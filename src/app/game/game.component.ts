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
    const dbObject = await doc(this.firestore, `games/${this.gameID}`);
    this.game$ = await docData(dbObject, { idField: 'id' });
    this.game$.subscribe((game) => {
      this.gameObject = game;
    });
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
  }

  setCurrentPlayer() {
    if (this.gameObject.currentPlayer == this.gameObject.players.length) {
      this.gameObject.currentPlayer = 1;
    } else {
      this.gameObject.currentPlayer++;
    }
  }

  popLastCard() {
    if (this.gameObject.stack.length > 0) {
      this.gameObject.currentCard = this.gameObject.stack.pop();
      this.pushPlayedCard();
    }
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
}
