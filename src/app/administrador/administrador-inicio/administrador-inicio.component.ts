import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Mensajes } from 'src/app/modelos/mensajes';
import { FirestoreService } from 'src/app/service/firestore.service';

@Component({
  selector: 'app-administrador-inicio',
  templateUrl: './administrador-inicio.component.html',
  styleUrls: ['./administrador-inicio.component.css']
})
export class AdministradorInicioComponent implements OnInit {

  public mensajes: Mensajes[]
  public mensaje: boolean = false
  public avisos: Mensajes[]
  public aviso: boolean = false
  public uId: string

  constructor(private firestore: FirestoreService, private auth: AngularFireAuth) {
    this.auth.currentUser.then( (auth)=> {
      this.uId = String(auth?.uid)
     }).catch((error)=> {
       console.log(error)
     })
   }

  ngOnInit(): void {
    this.getMessages()
    this.getNotices()
  }

  getMessages(): void {
    this.firestore.getNotifications<Mensajes>(this.uId,'Notificacion', false).subscribe((mensajes) => {
      this.mensaje = mensajes.length > 0
      this.mensajes = mensajes
    })
  }

  getNotices(): void {
    this.firestore.getNotifications<Mensajes>('todos','Aviso', true).subscribe((avisos) => {
      this.aviso = avisos.length > 0
      this.avisos = avisos
    })
  }

  readMessage(event: any): void {
    const { mensajeid } = event.target.dataset
    let data = { estatus: true }
    this.firestore.updateDocument(mensajeid, data, 'mensajes').catch((error)=> {
      alert("error al actualizar")
    })
  }

}
