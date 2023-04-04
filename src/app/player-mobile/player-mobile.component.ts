import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EditPlayerComponent } from '../edit-player/edit-player.component';
import { StoreDataService } from '../store-data.service';
import { Overlay } from '@angular/cdk/overlay';

@Component({
  selector: 'app-player-mobile',
  templateUrl: './player-mobile.component.html',
  styleUrls: ['./player-mobile.component.scss'],
})
export class PlayerMobileComponent {
  @Input() players!: string[];
  @Input() activePlayer!: number;
  @Input() playerImages!: string[];

  constructor(
    public dialog: MatDialog,
    public sds: StoreDataService,
    public overlay: Overlay
  ) {}

  editPlayer(playerID: number): void {
    this.sds.editPlayerID = playerID;

    const editDialog = this.dialog.open(EditPlayerComponent, {
      maxWidth: '100vw',
      scrollStrategy: this.overlay.scrollStrategies.noop(),
    });

    editDialog.afterClosed().subscribe((change: any) => {
      if (change) {
        this.sds.gameobject.players[playerID] = change.name;
        this.sds.gameobject.playerImages[playerID] = change.image;
        this.sds.updateGame();
      }
    });
  }
}
