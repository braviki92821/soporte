import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../service/firestore.service';
import { Reportes } from '../modelos/reportes';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-mis-reportes',
  templateUrl: './mis-reportes.component.html',
  styleUrls: ['./mis-reportes.component.css']
})
export class MisReportesComponent implements OnInit {

  public consultaReports:Reportes[];



  constructor(private firestore: FirestoreService) { }

  ngOnInit(): void {
    this.reportEstatus()
  }

  reportEstatus() {
      this.firestore.getCollectionByEquals<Reportes>('reportes', 'autor', 'uZlKZqhgfiZY9Jf00kwtXkCuhu13').subscribe((reportes) => {
        this.consultaReports = reportes
      })
  }

}
