import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../service/auth.service';
import { FirestoreService } from '../../service/firestore.service';
import { ActivatedRoute } from '@angular/router';
import { Reportes } from '../../modelos/reportes';
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
    prioridad : ['', Validators.required],
    archivo: []
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

  async sendReport(): Promise<void> {
    this.formSubmmited = true
    if(this.newReportForm.invalid) {
        return
    }
    this.reporte = this.newReportForm.value
    this.reporte.id = this.firestore.getId()
    this.reporte.enviado = this.today.toLocaleDateString() + " " + this.today.toLocaleTimeString()
    this.reporte.estatus = 'Enviado'
    this.reporte.autor = this.uId
    if(this.newReportForm.value.archivo != null){
      const url = await this.firestore.uploadFile(this.newReportForm.value.archivo, this.firestore.getId(), 'Reportes/')
      this.reporte.archivo = url
    }
    await this.firestore.createDocument(this.reporte, 'reportes', this.reporte.id).catch((error) => {
          console.log(error)
          alert('Error al enviar')
    });
          this.newReportForm.reset()
          alert('Enviado Correctamente')
  }

  onFileChange(event: any): void {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.newReportForm.patchValue({
        archivo: file
      });
    }
  }
}
