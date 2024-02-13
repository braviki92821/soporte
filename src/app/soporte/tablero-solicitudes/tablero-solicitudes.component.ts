import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FirestoreService } from '../../service/firestore.service';
import { Reportes } from '../../modelos/reportes';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Solucion } from '../../modelos/solucion';
import { Mensajes } from 'src/app/modelos/mensajes';

@Component({
  selector: 'app-tablero-solicitudes',
  templateUrl: './tablero-solicitudes.component.html',
  styleUrls: ['./tablero-solicitudes.component.css']
})
export class TableroSolicitudesComponent implements OnInit {

  public uId: string;
  public modalR: boolean = false
  public modalA: HTMLElement | null
  public consultReports: Reportes[]
  public solucion: Solucion
  public mensaje: Mensajes
  public inputId: HTMLElement | null
  public destinatario:HTMLElement | null
  public inputNombre: HTMLElement | null
  public inputArea: HTMLElement | null

  public soporteForm: FormGroup = this.fb.group({
      id:['', Validators.required],
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
    this.modalA = document.querySelector('.modal-Info')
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
     this.modalR = true
     const { reportid } = event.target.dataset
     const { usuarioid } = event.target.dataset
     this.inputId?.setAttribute('disabled', '')
     this.soporteForm.setValue({
       id: reportid,
       destinatario: usuarioid,
       mensaje: ''
     })
  }

  autor(event: any): void {
      this.modalA?.classList.remove('hidden')
      const { autor } = event.target.dataset
      console.log(autor)
      this.firestore.getDocument(autor, 'usuarios').subscribe((datos)=> {
      this.inputNombre?.setAttribute('value', datos.payload.data()['nombre'])
      this.inputNombre?.setAttribute('disabled', '')
      this.inputArea?.setAttribute('value', datos.payload.data()['area'])
      this.inputArea?.setAttribute('disabled', '')
    })
  }

  closeModal(): void {
    this.modalR = false
  }

  closeModalInfo(): void {
    this.modalA?.classList.add('hidden')
  }

  sendResponse(): void {
    if(this.soporteForm.invalid){
      return
    }
    this.solucion = this.soporteForm.value
    this.solucion.autor = this.uId
    this.firestore.updateDocument(this.solucion.id, { estatus: 'Verificando' }, 'reportes')
    this.firestore.createDocument(this.solucion, 'solucion', this.solucion.id).catch((error) => {
      alert('Error al enviar')
    });
    alert('Solucion enviada')
    this.closeModal()
  }

}
