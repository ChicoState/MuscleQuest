import { Component, inject } from '@angular/core';
import {
  Firestore,
  collection,
  collectionData,
  addDoc,
  CollectionReference,
  DocumentReference,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-firebase-demo',
  templateUrl: './firebase-demo.component.html',
  styleUrls: ['./firebase-demo.component.scss'],
})
export class FirebaseDemoComponent {
  private firestore: Firestore = inject(Firestore); // inject Cloud Firestore
  users$: Observable<UserProfile[]>;
  usersCollection: CollectionReference;

  constructor() {
    // get a reference to the user-profile collection
    const userProfileCollection = collection(this.firestore, 'users');

    // This line is from chatGPT, not the AngularFire docs
    // assign the collection reference to the usersCollection property
    this.usersCollection = userProfileCollection;

    // get documents (data) from the collection using collectionData
    this.users$ = collectionData(userProfileCollection) as Observable<
      UserProfile[]
    >;
  }

  addUserProfile(username: string) {
    if (!username) return;

    addDoc(this.usersCollection, <UserProfile>{ username }).then(
      (documentReference: DocumentReference) => {
        // the documentReference provides access to the newly created document
      }
    );
  }
}
export interface UserProfile {
  username: string;
}
