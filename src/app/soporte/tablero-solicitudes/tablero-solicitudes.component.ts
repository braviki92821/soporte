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
  public modalM: boolean = false
  public modalA: HTMLElement | null
  public consultReports: Reportes[]
  public solucion: Solucion
  public mensaje: Mensajes
  public inputId: HTMLElement | null
  public inputIdm: HTMLElement | null
  public destinatario:HTMLElement | null
  public inputNombre: HTMLElement | null
  public inputArea: HTMLElement | null

  public soporteForm: FormGroup = this.fb.group({
      id:['', Validators.required],
      destinatario: ['', Validators.required],
      mensaje: ['', Validators.required]
  })

  public solutionForm: FormGroup = this.fb.group({
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
    this.inputIdm = document.querySelector('.reporte-Idm')
    this.destinatario = document.querySelector('.usuario-Id')
    this.inputNombre = document.querySelector('.usuario-Ida')
    this.inputArea = document.querySelector('.usuario-Area')

  }

  reportTable(): void {
    this.firestore.getCollectionByEquals<Reportes>('reportes', 'atendido', this.uId).subscribe((reportes) => {
      this.consultReports = reportes
   })
  }

  showModalForm(event: any): void {
     this.modalR = true
     const { reportid, usuarioid } = event.target.dataset
     this.inputId?.setAttribute('disabled', '')
     this.soporteForm.setValue({
       id: reportid,
       destinatario: usuarioid,
       mensaje: ''
     })
  }

  showModalSolution(event: any): void {
    this.modalM = true
    this.inputIdm?.setAttribute('disabled', '')
    const { reportid, usuarioid } = event.target.dataset
    this.firestore.getDocument(reportid, 'solucion').subscribe((data) => { 
      this.solutionForm.setValue({
        id: reportid,
        destinatario: usuarioid,
        mensaje: data.payload.data()['mensaje']
      })
    })
  
  }

  autor(event: any): void {
      this.modalA?.classList.remove('hidden')
      const { autor } = event.target.dataset
      this.firestore.getDocument(autor, 'usuarios').subscribe((datos)=> {
      this.inputNombre?.setAttribute('value', datos.payload.data()['nombre'])
      this.inputNombre?.setAttribute('disabled', '')
      this.inputArea?.setAttribute('value', datos.payload.data()['area'])
      this.inputArea?.setAttribute('disabled', '')
    })
  }

  closeModal(): void {
    this.modalR = false
    this.modalM = false
  }

  closeModalInfo(): void {
    this.modalA?.classList.add('hidden')
  }

  async sendResponse(): Promise<void> {
    if(this.soporteForm.invalid){
      return
    }
    this.solucion = this.soporteForm.value
    this.solucion.autor = this.uId
    await this.firestore.updateDocument(this.solucion.id, { estatus: 'Verificando' }, 'reportes')
    await this.firestore.createDocument(this.solucion, 'solucion', this.solucion.id).catch((error) => {
      alert('Error al enviar')
    });
    alert('Solucion enviada')
    this.closeModal()
  }

  async sendNewResponse(): Promise<void> {
    if(this.solutionForm.invalid){
      return
    }
    this.solucion = this.solutionForm.value
    this.solucion.autor = this.uId
    await this.firestore.updateDocument(this.solucion.id, this.solucion, 'solucion').catch((error) => {
      alert("Error al actualizar")
    })
    alert('Solucion Modificada')
    this.closeModal()
  }

  async deleteReport(event: any) {
    const { reportid} = event.target.dataset
    await this.firestore.deleteDocument(reportid, 'reportes').catch((error) => alert("Error al borrar"))
    await this.firestore.deleteDocument(reportid, 'solucion').catch((error) => alert("Error al borrar"))
  }

}
