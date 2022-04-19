import firebase from 'firebase';
export class Store {
  id: string;
  storeId: string;
  storeName: string;
  storePhoneNumber: string;
  storeHiringManager: string;
  hiringManagersName: string;
  addressId: string;
  franchiseId: string;
  address: any;
  createdDate: firebase.firestore.FieldValue;
  updatedDate: firebase.firestore.FieldValue;
}