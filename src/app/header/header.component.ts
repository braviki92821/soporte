import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

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
