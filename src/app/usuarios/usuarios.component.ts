import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../service/firestore.service';
import { AuthService } from '../service/auth.service';
import { Usuarios } from '../modelos/usuario.model';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  public consultausers:Usuarios[];

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
    this.consultarUsuarios()
  }

  consultarUsuarios(){
    this.auth.getUsers<Usuarios>('usuarios').subscribe((user) => {
    this.consultausers = user;
  })
  }

}
