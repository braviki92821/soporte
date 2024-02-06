import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FirestoreService } from '../service/firestore.service';
import { Reportes } from '../modelos/reportes';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Solucion } from '../modelos/solucion';

@Component({
  selector: 'app-tablero-solicitudes',
  templateUrl: './tablero-solicitudes.component.html',
  styleUrls: ['./tablero-solicitudes.component.css']
})
export class TableroSolicitudesComponent implements OnInit {

  public uId: string;
  public consultReports: Reportes[]
  public solucion: Solucion
  public modal: HTMLElement | null
  public modalInfo: HTMLElement | null
  public closeFormModal: HTMLElement | null
  public inputId: HTMLElement | null
  public destinatario:HTMLElement | null
  public inputNombre: HTMLElement | null
  public inputArea: HTMLElement | null

  public soporteForm: FormGroup = this.fb.group({
      idReporte:['', Validators.required],
      destinatario: ['', Validators.required],
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
    this.reportTable()
    this.modal = document.querySelector('.modal-respuesta')
    this.modalInfo = document.querySelector('.modal-info')
    this.closeFormModal = document.querySelector('.modal-respuesta-cerrar')
    this.inputId = document.querySelector('.reporte-Id')
    this.destinatario = document.querySelector('.usuario-Id')
    this.inputNombre = document.querySelector('.usuario-Ida')
    this.inputArea = document.querySelector('.usuario-Area')

  }

  reportTable(): void {
    this.firestore.getCollectionTwoArguments<Reportes>('reportes', 'estatus', 'En Revision', 'atendido', this.uId).subscribe((reportes) => {
      this.consultReports = reportes
   })
  }

  showModalForm(event: any): void {
     const { reportid } = event.target.dataset
     const { usuarioid } = event.target.dataset
     console.log(reportid, usuarioid)
     this.modal?.classList.remove('hidden')
     this.inputId?.setAttribute('disabled', '')
     this.soporteForm.setValue({
      idReporte: reportid,
      destinatario: usuarioid,
      mensaje: ''
     })
  }

  autor(event: any): void {
     const { autor } = event.target.dataset
     this.modalInfo?.classList.remove('hidden')
      this.firestore.getDocument(autor, 'usuarios').subscribe((datos)=> {
      this.inputNombre?.setAttribute('value', datos.payload.data()['nombre'])
      this.inputNombre?.setAttribute('disabled', '')
      this.inputArea?.setAttribute('value', datos.payload.data()['area'])
      this.inputArea?.setAttribute('disabled', '')
    })
  }

  closeModal(): void {
    this.modal?.classList.add('hidden')
  }

  closeModalInfo(): void {
    this.modalInfo?.classList.add('hidden')
  }

  sendResponse(): void {
    if(this.soporteForm.invalid){
      return
    }
    this.solucion = this.soporteForm.value
    this.solucion.id = this.firestore.getId()
    this.solucion.autor = this.uId
    this.firestore.updateDocument(this.solucion.idReporte, {estatus: 'Verificando'}, 'reportes')
    this.firestore.createDocument(this.solucion, 'solucion', this.solucion.id).catch((error) => {
      alert('Error al enviar')
    });
    alert('Solucion enviada')
    this.closeModal()
  }

}
