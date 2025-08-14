import { Injectable, inject } from '@angular/core';
import {
  Firestore,
  collection,
  doc,
  setDoc,
  addDoc,
  updateDoc,
  collectionData,
  docData,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

// Define interfaces for our data structures for type safety
export interface UserProfile {
  uid: string;
  email: string;
  name: string;
  role: 'individual' | 'ong' | 'admin';
  createdAt: Date;
}

export interface Bingo {
  id?: string;
  name: string;
  date: Date;
  streamUrl: string;
  status: 'upcoming' | 'live' | 'finished';
  ongId: string;
  imageUrl: string;
  price: number;
  userLimit: number;
  maxTables: number;
}

export interface Prize {
  id?: string;
  name: string;
  description: string;
  winnerId?: string;
  wonAt?: Date;
  value: number;
  donorId: string;
}

export interface BingoCard {
    id?: string;
    userId: string;
    bingoId: string;
    cardData: any; // Can be a more specific type
    purchasedAt: Date;
}

export interface Donation {
    id?: string;
    donorId: string;
    donorType: 'individual' | 'ong';
    amount: number;
    currency: string;
    bingoId?: string;
    createdAt: Date;
}

export interface Report {
    id?: string;
    generatedBy: string; // Admin User ID
    title: string;
    details: string;
    createdAt: Date;
}


@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  private firestore: Firestore = inject(Firestore);

  constructor() {}

  // --- User Operations ---
  // This would typically be handled by Firebase Authentication,
  // but here is how you'd create the user profile document in Firestore.
  async createUserProfile(user: UserProfile) {
    const userRef = doc(this.firestore, `users/${user.uid}`);
    return setDoc(userRef, user);
  }

  // --- Bingo Operations ---
  async createBingo(bingo: Omit<Bingo, 'id'>, prizes: Omit<Prize, 'id'>[]) {
    // Create the main bingo document
    const bingoCollection = collection(this.firestore, 'bingos');
    const bingoRef = await addDoc(bingoCollection, bingo);

    // Create the prizes in the subcollection
    const prizesCollection = collection(bingoRef, 'prizes');
    for (const prize of prizes) {
      await addDoc(prizesCollection, prize);
    }
    return bingoRef.id;
  }

  // --- Bingo Card Operations ---
  async createUserBingoCards(userId: string, bingoId: string, numberOfCards: number) {
      const cardCollection = collection(this.firestore, 'bingoCards');
      for(let i = 0; i < numberOfCards; i++) {
          const cardData = this.generateBingoCardData(); // Placeholder for card generation logic
          const card: Omit<BingoCard, 'id'> = {
              userId,
              bingoId,
              cardData,
              purchasedAt: new Date()
          };
          await addDoc(cardCollection, card);
      }
  }

  // --- Donation Operations ---
  async addDonation(donation: Omit<Donation, 'id'>) {
    const donationCollection = collection(this.firestore, 'donations');
    return addDoc(donationCollection, donation);
  }

  // --- Prize Operations ---
  async assignPrizeToWinner(bingoId: string, prizeId: string, winnerId: string) {
    const prizeRef = doc(this.firestore, `bingos/${bingoId}/prizes/${prizeId}`);
    return updateDoc(prizeRef, {
      winnerId: winnerId,
      wonAt: new Date(),
    });
  }

  // --- Report Operations ---
  async createReport(report: Omit<Report, 'id'>) {
    const reportCollection = collection(this.firestore, 'reports');
    return addDoc(reportCollection, report);
  }

  // Helper function to generate card numbers
  private generateBingoCardData() {
    // In a real scenario, you would implement proper logic
    // to generate valid bingo card numbers.
    return { B: [1,2,3,4,5], I: [16,17,18,19,20], N: [31,32,34,35], G: [46,47,48,49,50], O: [61,62,63,64,65] };
  }
}
