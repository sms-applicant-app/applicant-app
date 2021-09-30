import firebase from 'firebase';
export class Applicant {
  name: string;
  email: string;
  phoneNumber: string;
  applicantId: string;
  status: string;
  storeId?: string;
  positionId: string;
  franchiseId: string;
  addressId?: string;
  jobId?: string;
  dob?: string;
  gender?: string;
  createdDate: firebase.firestore.FieldValue;
}
