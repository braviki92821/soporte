import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, map } from 'rxjs';
import { AuthService } from '../service/auth.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class UserGuardGuard implements CanActivate {
  constructor(private router: Router, private Auth: AngularFireAuth, private log: AuthService) {}

  canActivate():  Observable<boolean> {
    let tipo: string= ""
    return this.Auth.authState.pipe(
     map((auth) => {
      this.log.getUser(auth?.uid).subscribe((user) => {
         tipo = user.payload.data()['tipo']
       })
       if (auth && localStorage.getItem('tipoUser') == 'Usuario') {
         return true;
       } else {
         localStorage.removeItem('usuario');
         localStorage.removeItem('tipoUser');
         this.log.logout()
         this.router.navigate(['/auth/login']) 
         return false
       }
     })
   );
 }
  
}
