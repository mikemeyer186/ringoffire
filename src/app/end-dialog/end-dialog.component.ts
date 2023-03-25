import { Component, OnInit } from '@angular/core';
import { inject } from '@angular/core';
import {
  Firestore,
  collection,
  addDoc,
  doc,
  deleteDoc,
  collectionData,
} from '@angular/fire/firestore';
import { MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Game } from 'src/models/game';

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
    public dialogRef: MatDialogRef<EndDialogComponent>
  ) {}

  ngOnInit(): void {
    this.route.firstChild?.params.subscribe((params: any) => {
      this.gameID = params['id'];
    });
  }

  backToMenu() {
    this.endScreenClick = true;
    this.router.navigateByUrl('/');
    this.dialogRef.close();
    this.deleteGame();
  }

  async newGame() {
    this.endScreenClick = true;
    const gameCollection = await collection(this.firestore, 'games');
    await addDoc(gameCollection, this.gameObject.toJson()).then((game) => {
      this.loadGame(game.id);
    });
  }

  loadGame(id: string) {
    this.router.navigateByUrl(`/game/${id}`);
    this.dialogRef.close();
    this.deleteGame();
  }

  async deleteGame() {
    const dbObject = doc(this.firestore, `games/${this.gameID}`);
    await deleteDoc(dbObject);
  }
}
