import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header-soporte',
  templateUrl: './header-soporte.component.html',
  styleUrls: ['./header-soporte.component.css']
})
export class HeaderSoporteComponent implements OnInit {

  public nombre: string
  constructor(private auth: AuthService, private aroute: Router) { }

  ngOnInit(): void {
    this.nombre = localStorage.getItem('usuario')?.toString() || ''
    this.header()
  }

  header(): void {
    const opcionesConDesplegable = document.querySelectorAll(".opcion-con-desplegable");

    opcionesConDesplegable.forEach(function (opcion) {
      opcion.addEventListener("click", function () {
        const desplegable = opcion.querySelector(".desplegable");
    
        desplegable?.classList.toggle("hidden");
      });
    });
  }

  CloseSesion(): void {
    this.auth.logout()
    this.aroute.navigate(['/auth/login'])
  }

}
