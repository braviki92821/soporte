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
  public mensaje: Mensajes

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
    this.firestore.getMessages<Mensajes>(userid, this.uId, 'Mensaje').subscribe((messages)=> {
      this.consultMessages = messages
    })
  }

  async sendMessage() {
    const today: Date = new Date();
    if(this.formMessage.invalid){
      return
    }
    this.mensaje= this.formMessage.value
    this.mensaje.id = this.firestore.getId()
    this.mensaje.asunto = "Mensaje"
    this.mensaje.autor = this.uId
    this.mensaje.destino = this.destino
    this.mensaje.estatus = true
    this.mensaje.createdAt = today.toLocaleDateString() + " " + today.toLocaleTimeString() +":"+ today.getUTCMilliseconds().toString()
    await this.firestore.createDocument(this.mensaje, 'mensajes', this.mensaje.id).catch((error) => {
      alert('Error al enviar')
    });
    this.formMessage.reset()
  }

}
