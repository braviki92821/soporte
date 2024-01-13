import { Component, OnInit } from '@angular/core';
import { Reportes } from '../modelos/reportes';
import { FirestoreService } from '../service/firestore.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Solucion } from '../modelos/solucion';

@Component({
  selector: 'app-tablero-soporte',
  templateUrl: './tablero-soporte.component.html',
  styleUrls: ['./tablero-soporte.component.css']
})
export class TableroSoporteComponent implements OnInit {

  public formSubmmited: boolean = false

  public consultReports: Reportes[]

  public solucion: Solucion

  public today: Date = new Date();

  public takeReportForm: FormGroup = this.fb.group({
    idReporte: ['', Validators.required],
    destinatario: ['', Validators.required]
  })

  constructor(private firestore: FirestoreService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.reportTable()
  }

  reportTable() {
    this.firestore.getCollectionByEquals<Reportes>('reportes', 'estatus', 'Enviado').subscribe((reportes) => {
      this.consultReports = reportes
    })
  }

  takeReport (event: any) {
      const { reportid } = event.target.dataset
      if(reportid == '' || reportid == null) {
          alert('Dato no valido')
          return
      }
      let data = { 
        estatus: 'En Revision',
        atendido: '8redew64r8erw89r'
      }
      this.firestore.updateDocument(reportid, data, 'reportes')
      alert('Reporte tomado')
  }

}
