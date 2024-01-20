import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { CrearUsuarioComponent } from './crear-usuario/crear-usuario.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { SolicitudComponent } from './solicitud/solicitud.component';
import { MisReportesComponent } from './mis-reportes/mis-reportes.component';
import { TableroSoporteComponent } from './tablero-soporte/tablero-soporte.component';
import { TableroSolicitudesComponent } from './tablero-solicitudes/tablero-solicitudes.component';
import { OlvidePasswordComponent } from './olvide-password/olvide-password.component';

const routes: Routes = [
  { path:'', redirectTo: '/auth/login', pathMatch: 'full' },
  { path: 'auth/login', component: LoginComponent },
  { path: 'auth/olvide-password', component: OlvidePasswordComponent},
  { path: 'admin/crear-usuario', component: CrearUsuarioComponent },
  { path: 'admin/usuarios', component: UsuariosComponent },
  { path: 'support/crear-reporte', component: SolicitudComponent },
  { path: 'support/mis-reportes', component: MisReportesComponent },
  { path: 'user/tablero-reportes', component: TableroSoporteComponent},
  { path: 'user/tablero-soporte', component: TableroSolicitudesComponent},
  { path:'**', redirectTo: '/auth/login', pathMatch: 'full'}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
