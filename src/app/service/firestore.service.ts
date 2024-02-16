import { Injectable } from '@angular/core';
import { AngularFirestore,} from '@angular/fire/compat/firestore';
import { AngularFireStorage, GetDownloadURLPipe } from '@angular/fire/compat/storage';
import { finalize, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class FirestoreService {

  constructor(private firestore: AngularFirestore, private storage: AngularFireStorage) { }

  createDocument(data: any, path: string, id: string): Promise<void> {
    const collection = this.firestore.collection(path);
    return collection.doc(id).set(data);
  }

  getId(): string {
    return this.firestore.createId();
  }

  getCollection<tipo>(path: string): Observable<tipo[]> {
    const collection = this.firestore.collection<tipo>(path)
    return collection.valueChanges();
  }

  getCollectionByEquals<tipo>(path: string, field: string, compare: string ): Observable<tipo[]> {
    const collection = this.firestore.collection<tipo>(path, (ref) =>
      ref.where(field, '==', compare)
    );
    return collection.valueChanges();
  }

  getCollectionTwoArguments<tipo>(path: string, field: string, compare: string, field2: string, compare2: string): Observable<tipo[]> {
    const collection = this.firestore.collection<tipo>(path, (ref) =>
      ref.where(field, '==', compare).where(field2, '==', compare2)
    );
    return collection.valueChanges();
  }

  getNotifications<Mensajes>(destino:string, asunto: string, estatus: boolean): Observable<Mensajes[]> {
    const collection = this.firestore.collection<Mensajes>('mensajes', (ref) => 
      ref.where('destino', "==", destino).where('asunto','==', asunto).where('estatus', '==', estatus).orderBy('createdAt', 'desc')
    )
    return collection.valueChanges();
  }

  getMessages<Mensajes>(destino: string, autor: string, asunto: string): Observable<Mensajes[]> {
    const collection = this.firestore.collection<Mensajes>('mensajes', (ref) => 
    ref.where('destino', "in", [destino, autor]).where('asunto','==', asunto).where('autor', "in", [destino, autor]).orderBy('createdAt','asc'),
    )
    return collection.valueChanges();
  }

  getDocument(id: string,collection:string): Observable<any> {
    return this.firestore.collection(collection).doc(id).snapshotChanges();
  }

  getDocumentByEquals(collection: string, field: string, compare: string): Observable<any> { 
    return this.firestore.collection(collection, (ref) => ref.where(field, '==', compare)).snapshotChanges()
  }

  updateDocument(id:string, data:any, collection: string): Promise<void> {
    return this.firestore.collection(collection).doc(id).update(data);
  }

  uploadFile(archivo: any, nombre: string, path: string): Promise<string> {
    return new Promise((resolve) => {
      const ruta = path + nombre;
      const ref = this.storage.ref(ruta);
      const task = ref.put(archivo);
      task.snapshotChanges().pipe( finalize(() => {
            ref.getDownloadURL().subscribe((res) => {
              const downloadURL = res;
              resolve(downloadURL);
              return;
            });
          })
        ).subscribe(data=>data);
    });
  }

  deleteDocument(path: string, id: string): Promise<void> {
    return this.firestore.collection(path).doc(id).delete();
  }
  
}
