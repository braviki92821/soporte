import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Mensajes } from 'src/app/modelos/mensajes';
import { Reportes } from 'src/app/modelos/reportes';
import { FirestoreService } from 'src/app/service/firestore.service';

@Component({
  selector: 'app-buzon',
  templateUrl: './buzon.component.html',
  styleUrls: ['./buzon.component.css']
})
export class BuzonComponent implements OnInit {

  public consultReport: Reportes[]
  public consultMessages: Mensajes[]
  public messages: HTMLElement | null
  public destino: string
  public asunto: string
  public uId: string
  public mensaje: Mensajes

  public formMessage: FormGroup = this.fb.group({
    mensaje: ['', Validators.required]
  })
  
  constructor(private firestore: FirestoreService, private fb: FormBuilder, private auth: AngularFireAuth) {
    this.auth.currentUser.then( (auth)=> {
      this.uId = String(auth?.uid)
     }).catch((error)=> {
       console.log(error)
     })
  }

  ngOnInit(): void {
    this.getReports()
    this.messages = document.querySelector('.messages')
  }

  async getReports(): Promise<void> {
    await this.firestore.getCollectionTwoArguments<Reportes>('reportes', 'autor', this.uId, 'estatus', 'Verificando').subscribe((reports) => {
       this.consultReport = reports
     })
   }
 
   async getMessages(event: any): Promise<void>{
     const { userid, reportid } = event.target.dataset
     this.asunto = reportid
     this.destino = userid
     this.messages?.classList.remove('hidden')
     await this.firestore.getMessages<Mensajes>(userid, this.uId, reportid).subscribe((messages)=> {
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

}
