import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { FirestoreService } from '../service/firestore.service';
import { ActivatedRoute } from '@angular/router';
import { Reportes } from '../modelos/reportes';
import { DatePipe } from '@angular/common';

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

  public reporte: Reportes

  public today: Date = new Date();

  public errorFire = document.querySelector(".error-firebase")

  constructor(private fb: FormBuilder, private firestore: FirestoreService, private aroute: ActivatedRoute, private auth: AuthService) { }

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

  sendReport() {
    this.formSubmmited = true
    if(this.newReportForm.invalid) {
        return
    }
    this.reporte = this.newReportForm.value
    this.reporte.id = this.firestore.getId()
    this.reporte.fecha = this.today.toLocaleDateString()
    this.reporte.estatus = 'Enviado'
    this.reporte.autor = 'BYpJc5M1GEbn2bAT7njBcznmIlt2'
    this.firestore.createDocument(this.reporte, 'reportes', this.reporte.id).catch((error) => {
          alert('Error al enviar')
    });
          this.newReportForm.reset()
          alert('Enviado Correctamente')
  }
}
