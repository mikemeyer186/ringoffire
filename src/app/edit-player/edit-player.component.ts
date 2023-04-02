import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { StoreDataService } from '../store-data.service';

@Component({
  selector: 'app-edit-player',
  templateUrl: './edit-player.component.html',
  styleUrls: ['./edit-player.component.scss'],
})
export class EditPlayerComponent {
  name: string = this.sds.gameobject.players[this.sds.editPlayerID];
  currentImage: string =
    this.sds.gameobject.playerImages[this.sds.editPlayerID];
  playerImages = [
    'profil_f.png',
    'profil_m.png',
    'profil_panda.png',
    'profil_cat.jpg',
  ];

  constructor(
    public dialogRef: MatDialogRef<EditPlayerComponent>,
    public sds: StoreDataService
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  changeImage(image: string) {
    this.currentImage = image;
  }

  deletePlayer() {
    this.sds.gameobject.players.splice(this.sds.editPlayerID, 1);
    this.sds.gameobject.playerImages.splice(this.sds.editPlayerID, 1);
    this.checkCurrentplayer();
    this.sds.updateGame();
    this.dialogRef.close();
  }

  checkCurrentplayer() {
    const numberOfPlayers: number = this.sds.gameobject.players.length + 1;
    const editPlayerId: number = this.sds.editPlayerID + 1;
    let currentPlayer: number = this.sds.gameobject.currentPlayer;

    if (editPlayerId < currentPlayer) {
      this.sds.gameobject.currentPlayer--;
    } else if (
      editPlayerId == currentPlayer &&
      currentPlayer == numberOfPlayers
    ) {
      this.sds.gameobject.currentPlayer = 1;
    }
  }
}
