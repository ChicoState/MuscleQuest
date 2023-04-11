import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { onAuthStateChanged, getAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DataObject, Material, Element } from 'src/lib/user';
import { DEFAULT_USER_DATA } from 'src/lib/user';

@Injectable({
  providedIn: 'root',
})
export class FirebaseDataService {
  userCollection: AngularFirestoreCollection<DataObject>;
  authState = getAuth();

  constructor(private afs: AngularFirestore) {
    this.userCollection = afs.collection<DataObject>('users');
  }

  ngOnInit(): void {
    onAuthStateChanged(this.authState, (user) => {
      if (user) {
        console.log(user.uid);

        this.checkIfUserExists(user.uid).subscribe((exists) => {
          if (exists) {
            console.log('This user exists in the database');
          } else {
            console.log(
              'This is a new user. Generating a new object for this user.'
            );
            let newUser: DataObject = DEFAULT_USER_DATA;
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

  checkIfUserExists(userId: string): Observable<boolean> {
    const docRef = this.userCollection.doc(userId);
    return docRef.get().pipe(map((docSnapshot) => docSnapshot.exists));
  }
}
