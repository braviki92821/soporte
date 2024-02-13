import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public formSubmmited: boolean = false

  public formLogin: FormGroup = this.fb.group({
    correo: ['',[Validators.required, Validators.email]],
    password: ['', Validators.required]
  })

  constructor(private fb: FormBuilder, private auth: AuthService, private aroute: Router) { }

  ngOnInit(): void {
      this.auth.getAuth().subscribe((auth) => {
        this.auth.getUser(auth?.uid).subscribe((user) => {
          if(user.payload.data()['tipo'] == "Administrador"){
            this.aroute.navigate(['/admin/crear-usuario'])
            localStorage.setItem('usuario', user.payload.data()['nombre']);
            localStorage.setItem('tipoUser', user.payload.data()['tipo'])
          } else if(user.payload.data()['tipo'] == "Soporte"){
            this.aroute.navigate(['/user/tablero-reportes'])
            localStorage.setItem('usuario', user.payload.data()['nombre']);
            localStorage.setItem('tipoUser', user.payload.data()['tipo'])
          } else if( user.payload.data()['tipo'] == "Usuario"){
            this.aroute.navigate(['/user/inicio'])
            localStorage.setItem('usuario', user.payload.data()['nombre']);
            localStorage.setItem('tipoUser', user.payload.data()['tipo'])
          }
        })
      })
  }

  async Login(): Promise<void> {
    this.formSubmmited = true
    if (this.formLogin.invalid){
      return
    }
    await this.auth.login(this.formLogin.value.correo, this.formLogin.value.password)
  }

}
