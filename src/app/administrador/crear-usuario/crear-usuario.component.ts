import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FirestoreService } from 'src/app/service/firestore.service';
import { ActivatedRoute } from '@angular/router';
import { Usuarios } from '../../modelos/usuario.model';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.component.html',
  styleUrls: ['./crear-usuario.component.css']
})
export class CrearUsuarioComponent implements OnInit {

  public formSubmmited: boolean = false

  public newUserForm: FormGroup = this.fb.group({
    nombre: ['', Validators.required],
    correo: ['', [Validators.required, Validators.email]],
    area: ['', Validators.required],
    tipo: ['', Validators.required]
  })

  public usuario: Usuarios

  constructor(private fb: FormBuilder, private firestore: FirestoreService, private aroute: ActivatedRoute, private auth: AuthService) {}

  ngOnInit(): void {
  }

  validationError( campo:string ): boolean {
    if(this.newUserForm.get(campo)?.invalid && this.formSubmmited) {
        return true
    } 
        return false
  }

  get customError(): { [key: string]: AbstractControl } {
    return this.newUserForm?.controls;
  }

  newUser(): void {
      this.formSubmmited = true
      this.usuario = this.newUserForm.value
      let password: string = this.generarPassword()
      this.usuario.estatus = true
      if (this.newUserForm.invalid){
        return
      }
      this.auth.registrerUser(this.usuario.correo, password).subscribe((datos:any) => {
        const { localId } = datos
        this.usuario.id = localId
        this.firestore.createDocument(this.usuario, 'usuarios', localId)
      })
      alert("Creado correctamente")
      this.newUserForm.reset()
  }

  generarPassword(): string {
    let result = '';
    const chars =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@$%&/';
    for (let i = 0; i < 8; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

}
