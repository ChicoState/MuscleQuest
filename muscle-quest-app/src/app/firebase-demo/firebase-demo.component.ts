import { Component } from '@angular/core';
import { SloaneItemGeneratorService } from '../sloane-item-generator.service';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { ItemState } from 'src/lib/user';
import { onAuthStateChanged, getAuth } from '@angular/fire/auth';

export interface Item {
  name: string;
}

@Component({
  selector: 'app-firebase-demo',
  templateUrl: './firebase-demo.component.html',
  styleUrls: ['./firebase-demo.component.scss'],
})
export class FirebaseDemoComponent {
  private itemsCollection: AngularFirestoreCollection<Item>;
  items: Observable<Item[]>;
  authState = getAuth();
  constructor(private afs: AngularFirestore) {
    this.itemsCollection = afs.collection<Item>('items');
    this.items = this.itemsCollection.valueChanges();
  }

  ngOnInit(): void {
    onAuthStateChanged(this.authState, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        console.log(user.uid);
        console.log(user.displayName);
        // ...
      } else {
        // User is signed out
        // ...
      }
    });
  }

  addItem(item: Item) {
    this.itemsCollection.add(item);
  }
}
