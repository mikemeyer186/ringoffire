import { Component, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddDialogComponent } from '../add-dialog/add-dialog.component';
import { NavigationEnd, Router } from '@angular/router';
import { EndDialogComponent } from '../end-dialog/end-dialog.component';
import { StoreDataService } from '../store-data.service';
import { Subscription, map, throttleTime } from 'rxjs';
import { Overlay } from '@angular/cdk/overlay';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnDestroy {
  routerEvent: Subscription;
  updateEvent!: Subscription;
  endDialog: any = '';

  constructor(
    public dialog: MatDialog,
    private router: Router,
    public sds: StoreDataService,
    public overlay: Overlay
  ) {
    /**
     * checking if navigation to game/id
     * Same funktion like "ngOnInit", but fires evertime when navigation ends
     */
    this.routerEvent = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd && !(this.router.url == '/')) {
        this.setGame();
        this.checkUpdate();
      }
    });
  }

  ngOnDestroy(): void {
    this.routerEvent.unsubscribe();
    this.updateEvent.unsubscribe();
  }

  /**
   * setting up the game when navigated to game/id
   */
  setGame() {
    this.sds.getGameIdFromRoute();
    this.sds.loadGame();
    this.sds.resetStack();
    this.checkPlayer();

    setTimeout(() => {
      this.sds.updateFromDatabase();
    }, 1000);
  }

  /**
   * checking if no player is created and shows add player dialog
   */
  checkPlayer() {
    setTimeout(() => {
      if (this.sds.gameobject.players.length == 0) {
        this.openDialog();
      }
    }, 1000);
  }

  /**
   * checking if data has changed coming from firebase and setting the card stack visuals
   */
  checkUpdate() {
    this.updateEvent = this.sds.gameUpdate$
      .pipe(
        throttleTime(500),
        map(() => 'update')
      )
      .subscribe((update: any) => {
        this.checkCardStack();
      });
  }

  /**
   * taking a card from stack and updating all arrays and variables
   */
  takeCard() {
    this.sds.gameobject.pickCardAnimation = true;
    this.popLastCard();
    this.setCurrentPlayer();
    this.sds.updateGame();
    this.checkCardStack();
  }

  /**
   * checking the length of the card stack and sets the visuals
   * if card stack = 0, then showing the end screen dialog
   */
  checkCardStack() {
    let stackLength = this.sds.gameobject.stack.length;
    if (stackLength < 20 && stackLength >= 15) {
      this.sds.cardStack = [0, 1, 2, 3];
      this.sds.offset = 20;
    } else if (stackLength < 15 && stackLength >= 10) {
      this.sds.cardStack = [0, 1, 2];
      this.sds.offset = 15;
    } else if (stackLength < 10 && stackLength >= 5) {
      this.sds.cardStack = [0, 1];
      this.sds.offset = 10;
    } else if (stackLength < 5 && stackLength > 1) {
      this.sds.cardStack = [0];
      this.sds.offset = 5;
    } else if (stackLength == 1) {
      this.sds.noCards = true;
      this.endDialog = '';
    } else if (stackLength == 0) {
      this.sds.noCards = true;
      this.sds.noTakeCard = true;
      this.endScreenDialog();
    }
  }

  /**
   * setting the next player after taking a card
   */
  setCurrentPlayer() {
    if (
      this.sds.gameobject.currentPlayer == this.sds.gameobject.players.length ||
      this.sds.gameobject.players.length == 0
    ) {
      this.sds.gameobject.currentPlayer = 1;
    } else {
      this.sds.gameobject.currentPlayer++;
    }
  }

  /**
   * removes the played card from stack after taking
   */
  popLastCard() {
    this.sds.gameobject.currentCard = this.sds.gameobject.stack.pop();
    this.pushPlayedCard();
  }

  /**
   * pushing played card to played cards stack
   */
  pushPlayedCard() {
    if (this.sds.gameobject.currentCard != undefined) {
      this.sds.gameobject.playedCards.push(this.sds.gameobject.currentCard);
    }
  }

  /**
   * opening the add player dialog and passes data after closing
   */
  openDialog(): void {
    const addDialog = this.dialog.open(AddDialogComponent, {
      maxWidth: '100vw',
    });

    addDialog.afterClosed().subscribe((name: string) => {
      if (name) {
        this.sds.gameobject.players.push(name);
        this.sds.gameobject.playerImages.push('profile.png');
        this.sds.updateGame();
      }
    });
  }

  backToMenu() {
    this.router.navigateByUrl('/');
  }

  /**
   * opening end screen dialog
   */
  endScreenDialog(): void {
    if (!this.endDialog) {
      this.endDialog = this.dialog.open(EndDialogComponent, {
        disableClose: true,
        maxWidth: '100vw',
      });
    }
  }
}
