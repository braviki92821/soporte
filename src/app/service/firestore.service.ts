import { Injectable } from '@angular/core';
import { AngularFirestore,} from '@angular/fire/compat/firestore';
import { AngularFireStorage, GetDownloadURLPipe } from '@angular/fire/compat/storage';
import { finalize, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class FirestoreService {

  constructor(private firestore: AngularFirestore, private storage: AngularFireStorage) { }

  createDocument(data: any, path: string, id: string) {
    const collection = this.firestore.collection(path);
    return collection.doc(id).set(data);
  }

  getId() {
    return this.firestore.createId();
  }

  getCollectionByEquals<tipo>(path: string, field: string, compare: string, ) {
    const collection = this.firestore.collection<tipo>(path, (ref) =>
      ref.where(field, '==', compare)
    );
    return collection.valueChanges();
  }

  getCollectionTwoArguments<tipo>(path: string, field: string, compare: string, field2: string, compare2: string) {
    const collection = this.firestore.collection<tipo>(path, (ref) =>
      ref.where(field, '==', compare).where(field2, '==', compare2)
    );
    return collection.valueChanges();
  }

  getDocument(id: string,collection:string): Observable<any> {
    return this.firestore.collection(collection).doc(id).snapshotChanges();
  }

  updateDocument(id:string, data:any, collection: string){
    return this.firestore.collection(collection).doc(id).update(data);
  }
  
}
