import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map, retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private authfirebase: AngularFireAuth, private firestore: AngularFirestore, private https: HttpClient, private aroute: Router) { }

  registrerUser(email: string, password: string): Observable<object> {
    const url ='https://identitytoolkit.googleapis.com/v1/accounts:signUp?key='+environment.firebaseConfig.apiKey;
    let body = { email: email, password: password, returnSecureToken: true };
    return this.https.post(url, body)
  }

  login(email: string, password: string): Promise<unknown> {
    return new Promise((resolve, reject) => {
      this.authfirebase.signInWithEmailAndPassword(email, password).then(
        (datos) => { 
           resolve(datos) 
           this.getUser(datos.user?.uid).subscribe(user => {
            let tipo = user.payload.data()['tipo']
                if(tipo == "Administrador"){
                  this.aroute.navigate(['/admin/crear-usuario'])
                  localStorage.setItem('usuario',user.payload.data()['nombre']);
                  localStorage.setItem('tipoUser',tipo)
                } else if(tipo == "Soporte"){
                  this.aroute.navigate(['/support/tablero-reportes'])
                  localStorage.setItem('usuario',user.payload.data()['nombre']);
                  localStorage.setItem('tipoUser',tipo)
                } else if( tipo == "Usuario"){
                  this.aroute.navigate(['/user/inicio'])
                  localStorage.setItem('usuario',user.payload.data()['nombre']);
                  localStorage.setItem('tipoUser',tipo)
                }
           })
        },
        (error) => reject(error)
      );
    });
  }

  getAuth() {
    return this.authfirebase.authState.pipe(map((auth) => auth));
  }

  async logout(): Promise<void> {
  localStorage.removeItem('usuario');
  localStorage.removeItem('tipoUser');
  await this.authfirebase.signOut();
  }

  getUser(id?: string): Observable<any> {
    return this.firestore.collection('usuarios').doc(id).snapshotChanges();
  }

  getUsers<Usuario>(path: string, uId: string) {
    const collection = this.firestore.collection<Usuario>(path , (ref) =>
    ref.where('id', '!=', uId));
    return collection.valueChanges();
  }

  updateUser(id:string,body:any): Promise<void> {
    return this.firestore.collection('usuarios').doc(id).update(body)
  }

  deleteUser(id:string): Promise<void> {
    return this.firestore.collection('usuarios').doc(id).delete();
  } 

  recoveryPassword(email: string): Promise<void> {
    return this.authfirebase.sendPasswordResetEmail(email);
  }

}
