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
    'profil_f2.png',
    'profil_f3.png',
    'profil_m3.png',
    'profil_m2.png',
  ];

  constructor(
    public dialogRef: MatDialogRef<EditPlayerComponent>,
    public sds: StoreDataService
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  /**
   * changing the path of current image to selected image in dialog
   * @param image - image path of selected image in dialog
   */
  changeImage(image: string) {
    this.currentImage = image;
  }

  /**
   * deleting player in edit player dialog
   */
  deletePlayer() {
    this.sds.gameobject.players.splice(this.sds.editPlayerID, 1);
    this.sds.gameobject.playerImages.splice(this.sds.editPlayerID, 1);
    this.checkCurrentplayer();
    this.sds.updateGame();
    this.dialogRef.close();
  }

  /**
   * checking current player after deleting player and setting the right number to "current player"
   */
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
