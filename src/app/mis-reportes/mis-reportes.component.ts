import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../service/firestore.service';
import { Reportes } from '../modelos/reportes';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-mis-reportes',
  templateUrl: './mis-reportes.component.html',
  styleUrls: ['./mis-reportes.component.css']
})
export class MisReportesComponent implements OnInit {

  public consultaReports:Reportes[];
  public uId: string;

  constructor(private firestore: FirestoreService, private auth: AngularFireAuth) { 
    this.auth.currentUser.then( (auth)=> {
      this.uId = String(auth?.uid)
     }).catch((error)=> {
       console.log(error)
     })
  }

  ngOnInit(): void {
    this.reportEstatus()
  }

  reportEstatus() {
      this.firestore.getCollectionByEquals<Reportes>('reportes', 'autor', this.uId).subscribe((reportes) => {
        this.consultaReports = reportes
      })
  }

}
