import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { onAuthStateChanged, getAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { DataObject, Material, Element } from 'src/lib/user';
import { DEFAULT_USER_DATA } from 'src/lib/user';
import { ItemState } from 'src/lib/user';

@Injectable({
  providedIn: 'root',
})
export class SloaneUserUpdateService {
  userCollection: AngularFirestoreCollection<DataObject>;
  authState = getAuth();
  userDoc!: AngularFirestoreDocument<DataObject>; // add ! to indicate that it will be initialized in ngOnInit
  uid = '';
  userData: DataObject = DEFAULT_USER_DATA;

  constructor(private afs: AngularFirestore, private afAuth: AngularFireAuth) {
    this.userCollection = afs.collection<DataObject>('users');
  }

  ngOnInit(): void {
    onAuthStateChanged(this.authState, (user) => {
      if (user) {
        console.log(user.uid);
        this.uid = user.uid;
        this.userDoc = this.afs.doc<DataObject>(`users/${user.uid}`);

        this.checkIfUserExists(user.uid).subscribe((exists) => {
          if (exists) {
            console.log('This user exists in the database');
          } else {
            console.log(
              'This is a new user. Generating a new object for this user.'
            );
            let newUser: DataObject = DEFAULT_USER_DATA;
            newUser.userId = user.uid; // set the userId of the new user object
            this.saveUser(newUser);
          }
        });
      } else {
        console.log('User is signed out');
      }
    });
  }

  saveUser(dataObject: DataObject): Promise<void> {
    const id = dataObject.userId;
    return this.userCollection.doc(id).set(dataObject);
  }

  getUserData(): Observable<DataObject> {
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

  checkIfUserExists(userId: string): Observable<boolean> {
    const docRef = this.userCollection.doc(userId);
    console.log(docRef);
    console.log(
      docRef.valueChanges().subscribe((data) => {
        console.log(data);
        data?.equipped;
      })
    );
    return docRef.get().pipe(map((docSnapshot) => docSnapshot.exists));
  }

  giveItem(item: ItemState) {
    this.getUserData().pipe(tap((data) => (this.userData = data)));
    this.userData.items.push(item);
    this.saveUser(this.userData);
  }
}
