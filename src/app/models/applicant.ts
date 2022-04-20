import firebase from 'firebase';
export class Applicant {
  createdAt: firebase.firestore.FieldValue;
  updatedAt: firebase.firestore.FieldValue;
  name: string;
  email: string;
  phoneNumber: string;
  applicantId: string;
  status?: string;
  storeId?: string;
  positionId: string;
  franchiseId: string;
  addressId?: string;
  jobId?: string;
  dob?: string;
  gender?: string;
  onboardPackageID?: string;
}
