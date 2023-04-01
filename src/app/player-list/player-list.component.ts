import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EditPlayerComponent } from '../edit-player/edit-player.component';

@Component({
  selector: 'app-player-list',
  templateUrl: './player-list.component.html',
  styleUrls: ['./player-list.component.scss'],
})
export class PlayerListComponent {
  @Input() players!: string[];
  @Input() activePlayer!: number;

  constructor(public dialog: MatDialog) {}

  editPlayer(playerID: number): void {
    const dialogRef = this.dialog.open(EditPlayerComponent);

    dialogRef.afterClosed().subscribe((change: string) => {});
  }
}
