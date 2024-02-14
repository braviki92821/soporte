import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Mensajes } from 'src/app/modelos/mensajes';
import { Usuarios } from 'src/app/modelos/usuario.model';
import { AuthService } from 'src/app/service/auth.service';
import { FirestoreService } from 'src/app/service/firestore.service';

@Component({
  selector: 'app-mensajes-soporte',
  templateUrl: './mensajes-soporte.component.html',
  styleUrls: ['./mensajes-soporte.component.css']
})
export class MensajesSoporteComponent implements OnInit {
  
  public consultUsers: Usuarios[]
  public consultMessages: Mensajes[]
  public messages: HTMLElement | null
  public destino: string
  public uId: string
  public today: Date = new Date();

  public formMessage: FormGroup = this.fb.group({
    mensaje: ['', Validators.required]
  })
  
  constructor(private firestore: FirestoreService, private fb: FormBuilder, private auth: AngularFireAuth, private userAuth: AuthService) { 
    this.auth.currentUser.then( (auth)=> {
      this.uId = String(auth?.uid)
     }).catch((error)=> {
       console.log(error)
     })
  }

  ngOnInit(): void {
    this.getUsers()
    this.messages = document.querySelector('.messages')
  }

  getUsers(): void {
    this.userAuth.getUsers<Usuarios>('usuarios', this.uId).subscribe((users) => {
      this.consultUsers = users
    })
  }

  async getMessages(event: any): Promise<void>{
    const { userid } = event.target.dataset
    this.destino = userid
    this.messages?.classList.remove('hidden')
    this.firestore.getMessages<Mensajes>(userid, this.uId).subscribe((messages)=> {
      this.consultMessages = messages
    })
  }

  sendMessage() {
    let mensaje: Mensajes = {
      id: '',
      asunto: '',
      mensaje: '',
      autor: '',
      destino: '',
      estatus: false,
      createdAt: ''
    }
    if(this.formMessage.invalid){
      return
    }
    mensaje.id = this.firestore.getId()
    mensaje.asunto = "Mensaje"
    mensaje.autor = this.uId
    mensaje.destino = this.destino
    mensaje.estatus = true
    mensaje.mensaje = this.formMessage.value.mensaje
    mensaje.createdAt = mensaje.createdAt = this.today.toLocaleDateString() + " " + this.today.toLocaleTimeString()
    this.firestore.createDocument(mensaje, 'mensajes', mensaje.id).catch((error) => {
      alert('Error al enviar')
    });
    this.formMessage.reset()
  }

}
