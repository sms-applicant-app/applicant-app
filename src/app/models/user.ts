import firebase from 'firebase';
export class User {
  id: string;
  fullName: string;
  email: string;
  // emailVerified: boolean;
  phoneNumber: string;
  createdAt: firebase.firestore.FieldValue;
  franchiseId: string;
  storeIds?: [];
  role: string;
  calendlyLink?: string;
  isFranchiseOwner?: boolean;
}

