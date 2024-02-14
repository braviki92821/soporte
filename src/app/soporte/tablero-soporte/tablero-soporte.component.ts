import { Component, OnInit } from '@angular/core';
import { Reportes } from '../../modelos/reportes';
import { FirestoreService } from '../../service/firestore.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Solucion } from '../../modelos/solucion';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Mensajes } from 'src/app/modelos/mensajes';

@Component({
  selector: 'app-tablero-soporte',
  templateUrl: './tablero-soporte.component.html',
  styleUrls: ['./tablero-soporte.component.css']
})
export class TableroSoporteComponent implements OnInit {

  public uId: string;
  public formSubmmited: boolean = false
  public consultReports: Reportes[]
  public solucion: Solucion
  public today: Date = new Date();
  
  constructor(private firestore: FirestoreService, private fb: FormBuilder, private auth: AngularFireAuth) {
    this.auth.currentUser.then((auth)=> {
      this.uId = String(auth?.uid)
     })
   }

  ngOnInit(): void {
    this.reportTable()
  }

  reportTable(): void {
    this.firestore.getCollectionByEquals<Reportes>('reportes', 'estatus', 'Enviado').subscribe((reportes) => {
      this.consultReports = reportes
    })
  }

  takeReport(event: any): void {
      let mensaje: Mensajes = {
        id: '',
        asunto: '',
        mensaje: '',
        autor: '',
        destino: '',
        estatus: false,
        createdAt: ''
      }
      const { reportid, usuarioid } = event.target.dataset
      if(reportid == '' || reportid == null) {
          alert('Dato no valido')
          return
      }
      mensaje.id = this.firestore.getId()
      mensaje.autor = this.uId
      mensaje.destino = usuarioid
      mensaje.mensaje = "Tu reporte con Id: " + reportid + "Esta en revsion"
      mensaje.asunto = "Notificacion"
      mensaje.estatus = false
      mensaje.createdAt = this.today.toLocaleDateString() + " " + this.today.toLocaleTimeString()
      let data = { 
        estatus: 'En Revision',
        recibido: this.today.toLocaleDateString() + " " + this.today.toLocaleTimeString(),
        atendido: this.uId 
      }
      this.firestore.createDocument(mensaje, 'mensajes', mensaje.id).catch((error) => {
        console.log(error)
      });
      this.firestore.updateDocument(reportid, data, 'reportes')
      alert('Reporte tomado')
  }

}
