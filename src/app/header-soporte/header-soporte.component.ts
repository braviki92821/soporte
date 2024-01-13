import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header-soporte',
  templateUrl: './header-soporte.component.html',
  styleUrls: ['./header-soporte.component.css']
})
export class HeaderSoporteComponent implements OnInit {

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
