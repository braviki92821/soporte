import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { Usuarios } from '../../modelos/usuario.model';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  public uId: string;
  public consultausers: Usuarios[];

  constructor(private auth: AuthService, private fireAuth: AngularFireAuth) {
    this.fireAuth.currentUser.then((auth)=> {
      this.uId = String(auth?.uid)
     }).catch((error)=> {
       console.log(error)
     })
  }

  ngOnInit(): void {
    this.consultarUsuarios()
  }

  consultarUsuarios(): void{
    this.auth.getUsers<Usuarios>('usuarios', this.uId).subscribe((user) => {
    this.consultausers = user;
  })
  }

  async deleteUser(event: any): Promise<void>{
    const { usuarioid } = event.target.dataset
    if(usuarioid == '' || usuarioid == null) {
        alert('Dato no valido')
        return
    }
    await this.auth.deleteUser(usuarioid)
  }

}
