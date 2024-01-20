import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FirestoreService } from '../service/firestore.service';
import { Reportes } from '../modelos/reportes';

@Component({
  selector: 'app-tablero-solicitudes',
  templateUrl: './tablero-solicitudes.component.html',
  styleUrls: ['./tablero-solicitudes.component.css']
})
export class TableroSolicitudesComponent implements OnInit {

  public consultReports: Reportes[]
  public modal: HTMLElement | null
  public modalInfo: HTMLElement | null
  public closeFormModal: HTMLElement | null
  public inputId: HTMLElement | null
  public inputNombre: HTMLElement | null
  public inputArea: HTMLElement | null

  public soporteForm: FormGroup = this.fb.group({
      idReporte:['', Validators.required],
      solucion: ['', Validators.required]
  })
  
  constructor(private firestore: FirestoreService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.reportTable()
    this.modal = document.querySelector('.modal-respuesta')
    this.modalInfo = document.querySelector('.modal-info')
    this.closeFormModal = document.querySelector('.modal-respuesta-cerrar')
    this.inputId = document.querySelector('.reporte-Id')
    this.inputNombre = document.querySelector('.usuario-Id')
    this.inputArea = document.querySelector('.usuario-Area')
  }

  reportTable() {
    this.firestore.getCollectionTwoArguments<Reportes>('reportes', 'estatus', 'En Revision', 'atendido', '8redew64r8erw89r').subscribe((reportes) => {
      this.consultReports = reportes
   })
  }

  showModalForm(event: any) {
     const { reportid } = event.target.dataset
     this.modal?.classList.remove('hidden')
     this.inputId?.setAttribute('disabled', '')
     this.soporteForm.setValue({
      idReporte: reportid,
      solucion: ''
     })
  }

  autor(event: any){
     const { autor } = event.target.dataset
     this.modalInfo?.classList.remove('hidden')
      this.firestore.getDocument(autor, 'usuarios').subscribe((datos)=> {
      this.inputNombre?.setAttribute('value', datos.payload.data()['nombre'])
      this.inputNombre?.setAttribute('disabled', '')
      this.inputArea?.setAttribute('value', datos.payload.data()['area'])
      this.inputArea?.setAttribute('disabled', '')
    })
  }

  closeModal() {
    this.modal?.classList.add('hidden')
  }

  closeModalInfo(){
    this.modalInfo?.classList.add('hidden')
  }

}
