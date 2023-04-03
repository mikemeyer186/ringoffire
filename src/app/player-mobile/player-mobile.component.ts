import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EditPlayerComponent } from '../edit-player/edit-player.component';
import { StoreDataService } from '../store-data.service';

@Component({
  selector: 'app-player-mobile',
  templateUrl: './player-mobile.component.html',
  styleUrls: ['./player-mobile.component.scss'],
})
export class PlayerMobileComponent {
  @Input() players!: string[];
  @Input() activePlayer!: number;
  @Input() playerImages!: string[];

  constructor(public dialog: MatDialog, public sds: StoreDataService) {}

  editPlayer(playerID: number): void {
    this.sds.editPlayerID = playerID;

    const dialogRef = this.dialog.open(EditPlayerComponent);
    dialogRef.afterClosed().subscribe((change: any) => {
      if (change) {
        this.sds.gameobject.players[playerID] = change.name;
        this.sds.gameobject.playerImages[playerID] = change.image;
        this.sds.updateGame();
      }
    });
  }
}
