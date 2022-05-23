import {Address} from './address';
import firebase from 'firebase';
export class Store {
  id: string;
  createdAt: any;
  updatedAt: any;
  storeId: string;
  storeName: string;
  storePhoneNumber: string;
  storeHiringManager: string;
  hiringManagersName: string;
  addressId: string;
  franchiseId: string;
  address: Address;
  avatar: string;
}