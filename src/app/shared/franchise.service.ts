import { Injectable } from '@angular/core';
import {AngularFirestore} from "@angular/fire/firestore";
import {FirestoreHelperService} from './firestore-helper.service';

@Injectable({
  providedIn: 'root'
})
export class FranchiseService {
  message: string;
  storeData: any;
  constructor(
    public firestore: AngularFirestore,
    public dbHelper: FirestoreHelperService,
  ) { }
  getFranchiseById(id){
    return this.dbHelper.doc$(`franchisee/${id}`);
  }
}
