import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FirestoreService } from 'src/app/service/firestore.service';

@Component({
  selector: 'app-perfil-administrador',
  templateUrl: './perfil-administrador.component.html',
  styleUrls: ['./perfil-administrador.component.css']
})
export class PerfilAdministradorComponent implements OnInit {

  public uId: string
  public profileForm: FormGroup = this.fb.group({
      nombre: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      area: ['', Validators.required],
      tipo: ['', Validators.required]
  })

  constructor(private firestore: FirestoreService, private auth: AngularFireAuth, private fb: FormBuilder) { 
    this.auth.currentUser.then( (auth)=> {
      this.uId = String(auth?.uid)
     }).catch((error)=> {
       console.log(error)
     })
  }

  ngOnInit(): void {
    this.profile()
  }

  async profile(): Promise<void> {
   await this.firestore.getDocument(this.uId, 'usuarios').subscribe((user) => {
        this.profileForm.setValue({
          nombre: user.payload.data()['nombre'],
          correo: user.payload.data()['correo'],
          area: user.payload.data()['area'],
          tipo: user.payload.data()['tipo']
        })
    })
  }

}
