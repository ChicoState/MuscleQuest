import { Component } from '@angular/core';
import { SloaneItemGeneratorService } from '../sloane-item-generator.service';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { ItemState } from 'src/lib/user';
import { onAuthStateChanged, getAuth } from '@angular/fire/auth';
import { DataObject, Material, Element } from 'src/lib/user';

export interface Item {
  name: string;
}

@Component({
  selector: 'app-firebase-demo',
  templateUrl: './firebase-demo.component.html',
  styleUrls: ['./firebase-demo.component.scss'],
})
export class FirebaseDemoComponent {
  userCollection: AngularFirestoreCollection<DataObject>;

  private itemsCollection: AngularFirestoreCollection<Item>;
  items: Observable<Item[]>;
  authState = getAuth();
  constructor(private afs: AngularFirestore) {
    this.userCollection = afs.collection<DataObject>('users');
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

        let newUser: DataObject = {
          userId: user.uid,
          items: [
            {
              id: 'sword',
              strength: 2,
              dexterity: 0,
              material: Material.IRON,
              element: Element.LIGHTNING,
              display_name: 'Iron Sword of Lightning',
              display_icon: '/assets/item/iron_sword.png',
            },
            {
              id: 'helmet',
              strength: 0,
              dexterity: 0,
              display_name: 'Top Hat',
              display_icon: '/assets/item/top_hat.png',
            },
          ],
          gold: 0,
          wood: 0,
          iron: 0,
          equipped: {},
        };
        this.saveUser(newUser);

        if (this.checkIfUserExists(user.uid)) {
          console.log('This user exists in the database');
        } else {
          console.log(
            'This is a new user.  Generating a new object for this user.'
          );
          let newUser: DataObject = {
            userId: user.uid,
            items: [
              {
                id: 'sword',
                strength: 2,
                dexterity: 0,
                material: Material.IRON,
                element: Element.LIGHTNING,
                display_name: 'Iron Sword of Lightning',
                display_icon: '/assets/item/iron_sword.png',
              },
              {
                id: 'helmet',
                strength: 0,
                dexterity: 0,
                display_name: 'Top Hat',
                display_icon: '/assets/item/top_hat.png',
              },
            ],
            gold: 0,
            wood: 0,
            iron: 0,
            equipped: {},
          };
          this.saveUser(newUser);
        }
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

  saveUser(dataObject: DataObject): Promise<void> {
    const id = dataObject.userId;
    return this.userCollection.doc(id).set(dataObject);
  }

  checkIfUserExists(userId: string): Observable<boolean> {
    const docRef = this.userCollection.doc(userId);
    return docRef
      .get()
      .pipe(
        map(
          (docSnapshot: firebase.firestore.DocumentSnapshot<DataObject>) =>
            docSnapshot.exists
        )
      );
  }
}
