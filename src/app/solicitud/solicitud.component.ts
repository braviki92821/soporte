import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { FirestoreService } from '../service/firestore.service';
import { ActivatedRoute } from '@angular/router';
import { Reportes } from '../modelos/reportes';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-solicitud',
  templateUrl: './solicitud.component.html',
  styleUrls: ['./solicitud.component.css']
})
export class SolicitudComponent implements OnInit {

  public formSubmmited: boolean = false

  public newReportForm: FormGroup = this.fb.group({
    titulo: ['', Validators.required],
    descripcion: ['', [Validators.required, Validators.minLength(10)]],
    tipo: ['', Validators.required],
    prioridad : ['', Validators.required]
  })

  public uId: string;
  public reporte: Reportes
  public today: Date = new Date();
  public errorFire = document.querySelector(".error-firebase")

  constructor(private fb: FormBuilder, private firestore: FirestoreService, private auth: AngularFireAuth) {
    this.auth.currentUser.then((auth)=> {
      this.uId = String(auth?.uid)
     }).catch((error)=> {
       console.log(error)
     })
   }

  ngOnInit(): void {  
  }

  validationError( campo:string ): boolean {
    if(this.newReportForm.get(campo)?.invalid && this.formSubmmited) {
        return true
    } 
        return false
  }

  get customError(): { [key: string]: AbstractControl } {
    return this.newReportForm?.controls;
  }

  sendReport(): void {
    this.formSubmmited = true
    if(this.newReportForm.invalid) {
        return
    }
    this.reporte = this.newReportForm.value
    this.reporte.id = this.firestore.getId()
    this.reporte.fecha = this.today.toLocaleDateString()
    this.reporte.estatus = 'Enviado'
    this.reporte.autor = this.uId
    this.firestore.createDocument(this.reporte, 'reportes', this.reporte.id).catch((error) => {
          alert('Error al enviar')
    });
          this.newReportForm.reset()
          alert('Enviado Correctamente')
  }
}
