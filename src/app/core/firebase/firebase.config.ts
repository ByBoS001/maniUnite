
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getStorage, provideStorage } from '@angular/fire/storage';

const firebaseConfig = {
  apiKey: "AIzaSyCh96nT9idw8R8VcJfWrViyrPfiCcrwFRU",
  authDomain: "maniunite-b9bb9.firebaseapp.com",
  projectId: "maniunite-b9bb9",
  storageBucket: "maniunite-b9bb9.appspot.com",
  messagingSenderId: "79205100622",
  appId: "1:79205100622:web:c0ef5cf7027d00131a271f"
};

export const firebaseProviders = [
  provideFirebaseApp(() => initializeApp(firebaseConfig)),
  provideAuth(() => getAuth()),
  provideFirestore(() => getFirestore()),
  provideStorage(() => getStorage())
];

export const environment = {
  production: false,
  cloudinary: {
    cloudName: 'dj5jb14fu',
    uploadPreset: 'ManiUnite'
  }
};