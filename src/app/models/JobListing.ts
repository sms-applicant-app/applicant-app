
import firebase from 'firebase';

export class JobPosting {
  id: string;
  createdAt: any;
  updatedAt: firebase.firestore.FieldValue;
  recNumber: string;
  storeId: string;
  jobTitle: string;
  shortJobDescription: string;
  jobDescription: string;
  numberOfOpenSlots: number;
  addressId: string;
  jobType: string; // full time part time
  positionOpen: boolean;
  hiringManagerId: string;
  companyWebsite?: string;
  salary?: number;
  salaryUnit: string;
  positionExpiration?: firebase.firestore.FieldValue;
  franchiseId: string;
  qualifications?: string;
  specialNotes?: string;
  benefits?: string;
  onboardingPackageName?: string;
  onboardingPackageId?: string;
  typeFormUrlForInterview?: string;
  locationDetail?: string;
}
