import { Injectable, OnInit } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { onAuthStateChanged, getAuth, User } from '@angular/fire/auth';
import { Observable, throwError } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { DataObject, Material, Element } from 'src/lib/user';
import { DEFAULT_USER_DATA } from 'src/lib/user';
import { ItemState } from 'src/lib/user';

@Injectable({
  providedIn: 'root',
})
export class SloaneUserUpdateService implements OnInit {
  userCollection: AngularFirestoreCollection<DataObject>;
  authState = getAuth();
  userDoc!: AngularFirestoreDocument<DataObject>; // add ! to indicate that it will be initialized in ngOnInit
  uid = '';
  userData: DataObject = DEFAULT_USER_DATA;

  constructor(private afs: AngularFirestore, private afAuth: AngularFireAuth) {
    this.userCollection = afs.collection<DataObject>('users');
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

  getUserData(): Observable<DataObject> {
    if (!this.userDoc) {
      return throwError('User document not found');
    }
    return this.userDoc.valueChanges().pipe(
      map((data) => {
        if (data === undefined) {
          throw new Error('DataObject does not exist for this user');
        } else {
          return data;
        }
      })
    );
  }

  giveItem(item: ItemState) {
    console.log(this.afs.collection('users').doc(this.uid).valueChanges());
  }

  getUser(uid: string): Observable<User> {
    return this.afs
      .collection('users')
      .doc(uid)
      .valueChanges() as Observable<User>;
  }
}
