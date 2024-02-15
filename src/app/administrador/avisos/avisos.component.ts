import { Component, OnInit } from '@angular/core';
import { Mensajes } from 'src/app/modelos/mensajes';
import { FirestoreService } from 'src/app/service/firestore.service';

@Component({
  selector: 'app-avisos',
  templateUrl: './avisos.component.html',
  styleUrls: ['./avisos.component.css']
})
export class AvisosComponent implements OnInit {

  public mensajes: Mensajes[]

  constructor(private firestore: FirestoreService) { }

  ngOnInit(): void {
    this.getMessages();
  }

  getMessages(): void {
    this.firestore.getCollectionByEquals<Mensajes>('mensajes', 'asunto', 'Aviso').subscribe((mensajes) => {
      this.mensajes = mensajes
    })
  }

  async deleteMessage(event: any): Promise<void> {
    const { reportid } = event.target.dataset
    if( reportid == null || reportid == '') return

    await this.firestore.deleteDocument('mensajes', reportid).catch((error)=> {
      alert('Error al borrar')
    })
     alert('Eliminado Correctamente')
  }
}
