import { Injectable } from '@angular/core';
import { inject } from '@angular/core';
import { Firestore, doc, deleteDoc } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class StoreDataService {
  oldGameID: string = '';
  firestore: Firestore = inject(Firestore);

  constructor(private router: Router, private route: ActivatedRoute) {}

  async deleteGame() {
    this.getOldIdFromRoute();
    const dbObject = doc(this.firestore, `games/${this.oldGameID}`);
    await deleteDoc(dbObject);
  }

  getOldIdFromRoute() {
    this.route.firstChild?.params.subscribe((params: any) => {
      this.oldGameID = params['id'];
    });
  }
}
