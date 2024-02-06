import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../service/firestore.service';
import { Reportes } from '../modelos/reportes';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-mis-reportes',
  templateUrl: './mis-reportes.component.html',
  styleUrls: ['./mis-reportes.component.css']
})
export class MisReportesComponent implements OnInit {

  public consultaReports:Reportes[];
  public uId: string;
  public modal: HTMLElement | null
  public mensaje: HTMLElement | null

  constructor(private firestore: FirestoreService, private auth: AngularFireAuth) { 
    this.auth.currentUser.then( (auth)=> {
      this.uId = String(auth?.uid)
     }).catch((error)=> {
       console.log(error)
     })
  }

  ngOnInit(): void {
    this.reportEstatus()
    this.modal = document.querySelector('.modal-mensaje')
    this.mensaje = document.querySelector('.mensaje')
  }

  reportEstatus() {
      this.firestore.getCollectionByEquals<Reportes>('reportes', 'autor', this.uId).subscribe((reportes) => {
        this.consultaReports = reportes
      })
  }

  showModalForm(event: any): void {
    const { reportid } = event.target.dataset
    console.log(reportid)
    this.modal?.classList.remove('hidden')
    this.firestore.getDocumentByEquals('solucion', 'idReporte', reportid).subscribe((datos) => {
      console.log(datos[0].payload)
      //this.mensaje?.setAttribute('value', mensaje.payload.data()['mensaje'])
    })  
 }

  closeModal(): void {
    this.modal?.classList.add('hidden')
  }


}
