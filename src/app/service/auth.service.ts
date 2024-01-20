import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map, retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private authfirebase: AngularFireAuth, private firestore: AngularFirestore, private https: HttpClient) { }

  registrerUser(email: string, password: string){
    const url ='https://identitytoolkit.googleapis.com/v1/accounts:signUp?key='+environment.firebaseConfig.apiKey;
    let body = { email: email, password: password, returnSecureToken: true };
    return this.https.post(url, body)
  }

  login(email: string, password: string) {
    return new Promise((resolve, reject) => {
      this.authfirebase.signInWithEmailAndPassword(email, password).then(
        (datos) => resolve(datos),
        (error) => reject(error)
      );
    });
  }

  getAuth() {
    return this.authfirebase.authState.pipe(map((auth) => auth));
  }

  logout() {
    this.authfirebase.signOut();
  }

  getUser(id: string): Observable<any> {
    return this.firestore.collection('usuarios').doc(id).snapshotChanges();
  }

  getUsers<tipo>(path: string) {
    const collection = this.firestore.collection<tipo>(path);
    return collection.valueChanges();
  }

  updateUser(id:string,body:any){
    return this.firestore.collection('usuarios').doc(id).update(body)
  }

  deleteUser(id:string){
  return this.firestore.collection('usuarios').doc(id).delete();
  } 

  recoveryPassword(email: string) {
    return this.authfirebase.sendPasswordResetEmail(email);
  }

}
