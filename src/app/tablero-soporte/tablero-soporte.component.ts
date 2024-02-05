import { Component, OnInit } from '@angular/core';
import { Reportes } from '../modelos/reportes';
import { FirestoreService } from '../service/firestore.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Solucion } from '../modelos/solucion';
import { AngularFireAuth } from '@angular/fire/compat/auth';

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

  public takeReportForm: FormGroup = this.fb.group({
    idReporte: ['', Validators.required],
    destinatario: ['', Validators.required]
  })

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
      const { reportid } = event.target.dataset
      if(reportid == '' || reportid == null) {
          alert('Dato no valido')
          return
      }
      let data = { 
        estatus: 'En Revision',
        atendido: this.uId 
      }
      this.firestore.updateDocument(reportid, data, 'reportes')
      alert('Reporte tomado')
  }

}
