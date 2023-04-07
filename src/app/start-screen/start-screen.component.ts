import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoadDialogComponent } from '../load-dialog/load-dialog.component';
import { StoreDataService } from '../store-data.service';
@Component({
  selector: 'app-start-screen',
  templateUrl: './start-screen.component.html',
  styleUrls: ['./start-screen.component.scss'],
})
export class StartScreenComponent implements OnInit {
  constructor(public sds: StoreDataService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.sds.fetchGames();
  }

  /**
   * opening laod game dialog
   */
  openLoadDialog(): void {
    this.dialog.open(LoadDialogComponent, {
      maxWidth: '100vw',
    });
  }
}
