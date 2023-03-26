import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoadDialogComponent } from '../load-dialog/load-dialog.component';
import { StoreDataService } from '../store-data.service';
@Component({
  selector: 'app-start-screen',
  templateUrl: './start-screen.component.html',
  styleUrls: ['./start-screen.component.scss'],
})
export class StartScreenComponent {
  constructor(public sds: StoreDataService, public dialog: MatDialog) {}

  openLoadDialog(): void {
    this.dialog.open(LoadDialogComponent);
  }
}
