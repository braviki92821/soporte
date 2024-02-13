import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Mensajes } from 'src/app/modelos/mensajes';
import { Usuarios } from 'src/app/modelos/usuario.model';
import { FirestoreService } from 'src/app/service/firestore.service';

@Component({
  selector: 'app-enviar-reporte-admin',
  templateUrl: './enviar-reporte-admin.component.html',
  styleUrls: ['./enviar-reporte-admin.component.css']
})
export class EnviarReporteAdminComponent implements OnInit {

  public consultUsers: Usuarios[]
  public formSubmmited: Boolean = false
  public mensaje: Mensajes

  public formMensaje: FormGroup = this.fb.group({
    asunto: ['', [Validators.required]],
    mensaje: ['', [Validators.required, Validators.minLength(10)]],
    destino: ['', Validators.required]
  })
  
  constructor(private firestore: FirestoreService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.getUsers()
  }

  getUsers(): void {
    this.firestore.getCollectionByEquals<Usuarios>('usuarios', 'tipo', 'Soporte').subscribe((users) => {
      this.consultUsers = users
    })
  }

  get customError(): { [key: string]: AbstractControl } {
    return this.formMensaje?.controls;
  }

  validationError( campo: string ): boolean {
    if(this.formMensaje.get(campo)?.invalid && this.formSubmmited) {
        return true
    } 
        return false
  }

  sendMessage(): void {
    this.formSubmmited = true
    if(this.formMensaje.invalid){
      this.formSubmmited = false
        return;
    }
    this.mensaje = this.formMensaje.value
    this.mensaje.id = this.firestore.getId()
    this.mensaje.estatus = true
    this.firestore.createDocument(this.mensaje, 'mensajes', this.mensaje.id).catch((error) => {
      alert('Error al enviar')
});
      this.formMensaje.reset()
      alert('Enviado Correctamente')
      this.formSubmmited = false
  }

}
