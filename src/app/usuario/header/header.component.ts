import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public nombre: string
  constructor(private auth: AuthService, private aroute: Router) { }

  ngOnInit(): void {
    this.nombre = localStorage.getItem('usuario')?.toString() || ''
    this.header()
  }

  header() {
    const opcionesConDesplegable = document.querySelectorAll(".opcion-con-desplegable");

    opcionesConDesplegable.forEach(function (opcion) {
      opcion.addEventListener("click", function () {
        const desplegable = opcion.querySelector(".desplegable");
    
        desplegable?.classList.toggle("hidden");
      });
    });
  }

  logout(): void{
    this.auth.logout();
    this.aroute.navigate(['/auth/login'])
}

}
