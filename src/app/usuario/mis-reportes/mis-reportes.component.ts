import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../../service/firestore.service';
import { Reportes } from '../../modelos/reportes';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Mensajes } from 'src/app/modelos/mensajes';

@Component({
  selector: 'app-mis-reportes',
  templateUrl: './mis-reportes.component.html',
  styleUrls: ['./mis-reportes.component.css']
})
export class MisReportesComponent implements OnInit {

  public consultaReports:Reportes[];
  public uId: string;
  public modal: HTMLElement | null
  public chat: HTMLElement | null
  public menssage: HTMLElement | null
  public consultMessages: Mensajes[]
  public destino: string
  public mensaje: Mensajes
  public asunto: string

  public formMessage: FormGroup = this.fb.group({
    mensaje: ['', Validators.required]
  })

  constructor(private firestore: FirestoreService, private auth: AngularFireAuth, private fb: FormBuilder) { 
    this.auth.currentUser.then( (auth)=> {
      this.uId = String(auth?.uid)
     }).catch((error)=> {
       console.log(error)
     })
  }

  ngOnInit(): void {
    this.reportEstatus()
    this.modal = document.querySelector('.modal-mensaje')
    this.menssage = document.querySelector('.mensaje')
    this.chat = document.querySelector('.modal-chat')
  }

  reportEstatus(): void {
    this.firestore.getCollectionByEquals<Reportes>('reportes', 'autor', this.uId).subscribe((reportes) => {
      this.consultaReports = reportes
    })
  }

  async showModalForm(event: any): Promise<void> {
    const { reportid, atendido } = event.target.dataset
    this.destino = atendido
    this.asunto = reportid
    this.modal?.classList.remove('hidden')
    await this.firestore.getDocument(reportid, 'solucion').subscribe((datos) => {
      this.menssage?.setAttribute('placeholder', datos.payload.data()['mensaje'])
      this.menssage?.setAttribute('disabled', '')
    }) 
  }

  showModal(event: any): void {
    const { reportid, atendido } = event.target.dataset
    this.destino = atendido
    this.asunto = reportid
    this.chat?.classList.remove('hidden')
    this.firestore.getMessages<Mensajes>(atendido, this.uId, reportid).subscribe((messages) => {
      this.consultMessages = messages;
    }) 
  }

  closeModal(): void {
    this.modal?.classList.add('hidden')
  }

  closeModalChat(): void {
    this.chat?.classList.add('hidden')
  }

  async sendMessage(): Promise<void> {
    const today: Date = new Date();
    if(this.formMessage.invalid){
      return
    }
    this.mensaje= this.formMessage.value
    this.mensaje.id = this.firestore.getId()
    this.mensaje.asunto = this.asunto
    this.mensaje.autor = this.uId
    this.mensaje.destino = this.destino
    this.mensaje.estatus = true   
    this.mensaje.createdAt = today.toLocaleDateString() + " " + today.toLocaleTimeString() +":"+ today.getUTCMilliseconds().toString()
    await this.firestore.createDocument(this.mensaje, 'mensajes', this.mensaje.id).catch((error) => {
      alert('Error al enviar')
    });
    this.formMessage.reset()
  }

  async acceptSolution(): Promise<void> {
    const today: Date = new Date();
    if(this.asunto == null || this.asunto == ''){
      return
    }
    this.mensaje = { id: this.firestore.getId(), asunto: 'Notificacion', mensaje: 'Se ha aceptado la solucion del reporte: ' +this.asunto + ' Puede eliminar el reporte', autor: this.uId, destino: this.destino, estatus: false, createdAt:today.toLocaleDateString() + " " + today.toLocaleTimeString() +":"+ today.getUTCMilliseconds().toString() }
    let data = { estatus: 'Completo' }
    await this.firestore.updateDocument(this.asunto, data, 'reportes').catch((error) => {
      alert("Error")
    });
  
    await this.firestore.createDocument(this.mensaje, 'mensajes', this.mensaje.id).catch((error)=> error)

    alert("Gracias por su respuesta")
  }

  async deleteReport(event: any): Promise<void> {
    const { reportid } = event.target.dataset
    await this.firestore.deleteDocument('reportes', reportid).catch((error) => {
      alert("Error al borrar")
    })
  }
}
