import { Injectable, OnInit } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { onAuthStateChanged, getAuth } from '@angular/fire/auth';
import { Observable, of } from 'rxjs';
import { map, tap, switchMap } from 'rxjs/operators';
import { DataObject, Material, Element, DEFAULT_USER_DATA } from 'src/lib/user';
import { SloaneItemGeneratorService } from './sloane-item-generator.service';
import { ItemState } from 'src/lib/user';

@Injectable({
  providedIn: 'root',
})
export class SloaneUserUpdateService implements OnInit {
  userCollection: AngularFirestoreCollection<DataObject>;
  authState = getAuth();
  userDoc!: AngularFirestoreDocument<DataObject>; // add ! to indicate that it will be initialized in ngOnInit
  uid = '';
  userData: DataObject | null = DEFAULT_USER_DATA;

  constructor(
    private afs: AngularFirestore,
    private afAuth: AngularFireAuth,
    private itemService: SloaneItemGeneratorService
  ) {
    this.userCollection = afs.collection<DataObject>('users');
    this.getCurrentUser().subscribe((user) => {
      this.userData = user;
    });
  }

  ngOnInit(): void {
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        console.log(user?.uid);
        console.log('huh');
        this.uid = user?.uid;
      } else {
        console.log('No user is logged in');
      }
    });
  }

  saveUser(dataObject: DataObject): Promise<void> {
    const id = dataObject.userId;
    return this.userCollection.doc(id).set(dataObject);
  }

  getCurrentUser(): Observable<DataObject | null> {
    return this.afAuth.authState.pipe(
      switchMap((user) => {
        if (user) {
          return this.afs
            .collection('users')
            .doc(user.uid)
            .valueChanges() as Observable<DataObject>;
        } else {
          return of(null);
        }
      })
    );
  }

  giveItem() {
    console.log(this.userData?.items);
    const userRef = this.afs.collection('users').doc(this.userData?.userId);
    const newItem = this.itemService.createNewItem(1);
    this.userData?.items.push(newItem);
    return userRef.set(this.userData, { merge: true });
  }
}
