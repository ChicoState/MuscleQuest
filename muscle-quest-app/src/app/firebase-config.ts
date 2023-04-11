import {
  FirebaseUIModule,
  NativeFirebaseUIAuthConfig,
} from 'firebaseui-angular';

import * as firebase from 'firebase/app';

const firebaseUiAuthConfig: NativeFirebaseUIAuthConfig = {
  providers: [
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    firebase.auth.TwitterAuthProvider.PROVIDER_ID,
    firebase.auth.GithubAuthProvider.PROVIDER_ID,
  ],
  tosUrl: '/terms-of-service',
  privacyPolicyUrl: '/privacy-policy',
  credentialHelper: firebaseui.auth.CredentialHelper.GOOGLE_YOLO,
  signInFlow: 'popup',
  signInSuccessUrl: '/',
  signInOptions: [
    {
      requireDisplayName: true,
      provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
    },
  ],
  autoUpgradeAnonymousUsers: true,
  callbacks: {
    signInSuccessWithAuthResult: (authResult, redirectUrl) => {
      // Your logic here
      return true;
    },
    uiShown: () => {
      // Your logic here
    },
  },
};
