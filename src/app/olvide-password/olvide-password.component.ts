import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-olvide-password',
  templateUrl: './olvide-password.component.html',
  styleUrls: ['./olvide-password.component.css']
})
export class OlvidePasswordComponent implements OnInit {

  public formForgotPassword: FormGroup = this.fb.group({
    correo: ['', [Validators.required, Validators.email]]
  })
  public formSubmmited: boolean = false

  constructor(private fb: FormBuilder, private auth: AuthService) { }

  ngOnInit(): void {
  }

  validationError( campo:string ): boolean {
    if(this.formForgotPassword.get(campo)?.invalid && this.formSubmmited) {
        return true
    } 
        return false
  }

  get customError(): { [key: string]: AbstractControl } {
    return this.formForgotPassword?.controls;
  }

  sendEmail(){
    this.formSubmmited = true
    if(this.formForgotPassword.invalid){
      return
    }
    this.auth.recoveryPassword(this.formForgotPassword.value.correo).then(()=>{
      alert('Correo enviado')
    }).catch((error)=>{
      console.log(error)
      alert('Error al enviar')
    })
  }

}
