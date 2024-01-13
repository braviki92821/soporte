import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header-admin',
  templateUrl: './header-admin.component.html',
  styleUrls: ['./header-admin.component.css']
})
export class HeaderAdminComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
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

}
