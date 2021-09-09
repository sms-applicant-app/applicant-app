import firebase from 'firebase';


export class Position {
  recNumber: string;
  storeId: string;
  jobTitle: string;
  shortJobDescription: string;
  jobDescription: string;
  numberOfOpenSlots: string;
  addressId: string;
  jobType: string; // full time part time
  positionOpen: boolean;
  companyWebsite: string;
  salary: string;
  dateCreated: string;
  positionExpiration: string;
  franchiseId: string;
  createdAt: firebase.firestore.FieldValue;
}
