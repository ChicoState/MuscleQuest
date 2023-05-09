import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { onAuthStateChanged, getAuth, User } from '@angular/fire/auth';
import { Observable, throwError } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { DataObject, Material, Element } from 'src/lib/user';
import { DEFAULT_USER_DATA } from 'src/lib/user';
import { ItemState } from 'src/lib/user';

@Component({
  selector: 'app-user-authentication',
  templateUrl: './user-authentication.component.html',
  styleUrls: ['./user-authentication.component.scss'],
})
export class UserAuthenticationComponent implements OnInit {
  user: firebase.User | null = null;
  authState = getAuth();
  userCollection: AngularFirestoreCollection<DataObject>;
  uid = '';
  userDoc!: AngularFirestoreDocument<DataObject>;

  constructor(public auth: AngularFireAuth, private afs: AngularFirestore) {
    this.userCollection = afs.collection<DataObject>('users');
  }

  ngOnInit() {
    this.auth.authState.subscribe((user) => {
      this.user = user;
      console.log(user?.uid);
    });

    onAuthStateChanged(this.authState, (user) => {
      if (user) {
        console.log(user.uid);
        this.uid = user.uid;
        this.userDoc = this.afs.doc<DataObject>(`users/${user.uid}`);
        console.log(this.userDoc);

        this.checkIfUserExists(user.uid).subscribe((exists) => {
          if (exists) {
            console.log('This user exists in the database');
          } else {
            console.log(
              'This is a new user. Generating a new object for this user.'
            );
            const newUser: DataObject = DEFAULT_USER_DATA;
            newUser.userId = user.uid; // set the userId of the new user object
            this.saveUser(newUser);
          }
        });
      } else {
        console.log('User is signed out');
      }
    });
  }

  checkIfUserExists(userId: string): Observable<boolean> {
    const observable = this.afs
      .collection('users')
      .doc(this.uid)
      .valueChanges();
    observable.subscribe((data) => {
      console.log(data);
    });
    const docRef = this.userCollection.doc(userId);
    return docRef.get().pipe(map((docSnapshot) => docSnapshot.exists));
  }

  login() {
    this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  logout() {
    this.auth.signOut();
  }

  saveUser(dataObject: DataObject): Promise<void> {
    const id = dataObject.userId;
    return this.userCollection.doc(id).set(dataObject);
  }

  getUid() {
    return this.uid;
  }
}
