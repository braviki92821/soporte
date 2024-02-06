import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { CrearUsuarioComponent } from './administrador/crear-usuario/crear-usuario.component';
import { UsuariosComponent } from './administrador/usuarios/usuarios.component';
import { SolicitudComponent } from './solicitud/solicitud.component';
import { MisReportesComponent } from './mis-reportes/mis-reportes.component';
import { TableroSoporteComponent } from './tablero-soporte/tablero-soporte.component';
import { TableroSolicitudesComponent } from './tablero-solicitudes/tablero-solicitudes.component';
import { OlvidePasswordComponent } from './olvide-password/olvide-password.component';
import { SupportGuardGuard } from './guards/support-guard.guard';
import { AdminGuardGuard } from './guards/admin-guard.guard';
import { TableroAtencionComponent } from './administrador/tablero-atencion/tablero-atencion.component';
import { EnviarReporteAdminComponent } from './administrador/enviar-reporte-admin/enviar-reporte-admin.component';
import { MensajesAdminComponent } from './administrador/mensajes-admin/mensajes-admin.component';
import { UserGuardGuard } from './guards/user-guard.guard';

const routes: Routes = [
  { path:'', redirectTo: '/auth/login', pathMatch: 'full' },
  { path: 'auth/login', component: LoginComponent },
  { path: 'auth/olvide-password', component: OlvidePasswordComponent},
  { path: 'admin/crear-usuario', component: CrearUsuarioComponent, canActivate: [AdminGuardGuard] },
  { path: 'admin/usuarios', component: UsuariosComponent, canActivate: [AdminGuardGuard] },
  { path: 'admin/tablero', component: TableroAtencionComponent, canActivate: [AdminGuardGuard] },
  { path: 'admin/enviar-mensaje', component: EnviarReporteAdminComponent, canActivate: [AdminGuardGuard] },
  { path: 'admin/mensajes', component:MensajesAdminComponent, canActivate: [AdminGuardGuard] },
  { path: 'support/crear-reporte', component: SolicitudComponent, canActivate: [UserGuardGuard] },
  { path: 'support/mis-reportes', component: MisReportesComponent, canActivate: [UserGuardGuard] },
  { path: 'user/tablero-reportes', component: TableroSoporteComponent, canActivate:[SupportGuardGuard]},
  { path: 'user/tablero-soporte', component: TableroSolicitudesComponent, canActivate:[SupportGuardGuard]},
  { path:'**', redirectTo: '/auth/login', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
