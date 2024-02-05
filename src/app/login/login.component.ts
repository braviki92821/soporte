import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../service/auth.service';

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

  constructor(private fb: FormBuilder, private auth: AuthService) { }

  ngOnInit(): void {
  }

  async Login(): Promise<void> {
    this.formSubmmited = true
    if (this.formLogin.invalid){
      return
    }
    await this.auth.login(this.formLogin.value.correo, this.formLogin.value.password)
  }

}
