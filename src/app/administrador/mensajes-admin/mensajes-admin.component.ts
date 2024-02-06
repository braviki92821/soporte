import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Mensajes } from 'src/app/modelos/mensajes';
import { Usuarios } from 'src/app/modelos/usuario.model';
import { FirestoreService } from 'src/app/service/firestore.service';

@Component({
  selector: 'app-mensajes-admin',
  templateUrl: './mensajes-admin.component.html',
  styleUrls: ['./mensajes-admin.component.css']
})
export class MensajesAdminComponent implements OnInit {

  public consultUsers: Usuarios[]
  public consultMessages: Mensajes[]
  public messages: HTMLElement | null

  constructor(private firestore: FirestoreService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.getUsers()
    this.messages = document.querySelector('.messages')
  }

  getUsers(): void {
    this.firestore.getCollectionByEquals<Usuarios>('usuarios', 'tipo', 'Soporte').subscribe((users) => {
      this.consultUsers = users
    })
  }

  getMessages(event: any): void{
    const { userid } = event.target.dataset
    this.messages?.classList.remove('hidden')
    this.firestore.getCollectionByEquals<Mensajes>('mensajes', 'destino', userid ).subscribe((messages)=> {
      this.consultMessages = messages
    })
  }

}
