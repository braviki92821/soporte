import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Reportes } from 'src/app/modelos/reportes';
import { Usuarios } from 'src/app/modelos/usuario.model';
import { FirestoreService } from 'src/app/service/firestore.service';

@Component({
  selector: 'app-tablero-atencion',
  templateUrl: './tablero-atencion.component.html',
  styleUrls: ['./tablero-atencion.component.css']
})
export class TableroAtencionComponent implements OnInit {

  public consultReports: Reportes[]
  public consultUsers: Usuarios[]
  public modal : HTMLElement | null
  public reporteText: HTMLElement | null
  public formSubmmited: boolean = false

  public formUser: FormGroup = this.fb.group({
    reporte: ['', Validators.required],
    usuario: ['', Validators.required]
  })
  constructor(private firestore: FirestoreService, private fb: FormBuilder) { 
   
  }

  ngOnInit(): void {
    this.reportTable()
    this.getUsers()
    this.modal = document.querySelector('.modal-info')
    this.reporteText = document.querySelector('.reporte-text')
  }

  reportTable(): void {
    this.firestore.getCollectionByEquals<Reportes>('reportes', 'estatus', 'Enviado').subscribe((reportes) => {
      this.consultReports = reportes
    })
  }

  getUsers(): void {
    this.firestore.getCollectionByEquals<Usuarios>('usuarios', 'tipo', 'Soporte').subscribe((users) => {
      this.consultUsers = users
    })
  }

  showModalForm(event: any): void {
    const { reportid } = event.target.dataset
    this.formUser.patchValue({ reporte: reportid})
    this.modal?.classList.remove('hidden')
    this.reporteText?.setAttribute('disabled','')
  }

  closeModal(): void {
  this.modal?.classList.add('hidden')
  }
 
  asignarReporte(): void {
   this.formSubmmited = true
   if(this.formUser.invalid){
    this.formSubmmited = false
    return
   }
   let data = { 
     estatus: 'En Revision',
     atendido: this.formUser.value.usuario 
   }
   this.firestore.updateDocument(this.formUser.value.reporte, data, 'reportes')
   alert('Reporte Asignado')
   this.closeModal()
 }

}
