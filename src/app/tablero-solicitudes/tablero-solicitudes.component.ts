import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FirestoreService } from '../service/firestore.service';
import { Reportes } from '../modelos/reportes';

@Component({
  selector: 'app-tablero-solicitudes',
  templateUrl: './tablero-solicitudes.component.html',
  styleUrls: ['./tablero-solicitudes.component.css']
})
export class TableroSolicitudesComponent implements OnInit {

  public consultReports: Reportes[]

  public modal = document.querySelector('.modal-respuesta')

  public closeFormModal = document.querySelector('.modal-respuesta-cerrar')

  public inputId = document.querySelector('.reporte-Id')
  
  constructor(private firestore: FirestoreService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.reportTable()
  }

  reportTable() {
    this.firestore.getCollectionTwoArguments<Reportes>('reportes', 'estatus', 'En Revision', 'atendido', '8redew64r8erw89r').subscribe((reportes) => {
      this.consultReports = reportes
   })
  }

  showModalForm(event: any) {
     this.modal = document.querySelector('.modal-respuesta')
     this.modal?.classList.remove('hidden')
     const { reportid } = event.target.dataset
     this.inputId?.setAttribute('value', reportid)
  }

  closeModal() {
    this.modal?.classList.add('hidden')
  }

}
