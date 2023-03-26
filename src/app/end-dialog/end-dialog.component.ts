import { Component, OnInit } from '@angular/core';
import { inject } from '@angular/core';
import {
  Firestore,
  collection,
  addDoc,
  doc,
  deleteDoc,
} from '@angular/fire/firestore';
import { MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Game } from 'src/models/game';
import { StoreDataService } from '../store-data.service';

@Component({
  selector: 'app-end-dialog',
  templateUrl: './end-dialog.component.html',
  styleUrls: ['./end-dialog.component.scss'],
})
export class EndDialogComponent implements OnInit {
  endScreenClick: Boolean = false;
  firestore: Firestore = inject(Firestore);
  gameObject: Game = new Game();
  gameID: string = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public dialogRef: MatDialogRef<EndDialogComponent>,
    public StoreDataService: StoreDataService
  ) {}

  ngOnInit(): void {}

  backToMenu() {
    this.endScreenClick = true;
    this.StoreDataService.deleteGame();
    this.router.navigateByUrl('/');
    this.dialogRef.close();
  }

  async newGame() {
    this.endScreenClick = true;
    const gameCollection = collection(this.firestore, 'games');
    await addDoc(gameCollection, this.gameObject.toJson()).then((game) => {
      this.loadGame(game.id);
    });
  }

  loadGame(id: string) {
    this.StoreDataService.deleteGame();
    this.router.navigateByUrl(`/game/${id}`);
  }
}
