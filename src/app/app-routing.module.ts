import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { CrearUsuarioComponent } from './administrador/crear-usuario/crear-usuario.component';
import { UsuariosComponent } from './administrador/usuarios/usuarios.component';
import { SolicitudComponent } from './usuario/solicitud/solicitud.component';
import { MisReportesComponent } from './usuario/mis-reportes/mis-reportes.component';
import { TableroSoporteComponent } from './soporte/tablero-soporte/tablero-soporte.component';
import { TableroSolicitudesComponent } from './soporte/tablero-solicitudes/tablero-solicitudes.component';
import { OlvidePasswordComponent } from './olvide-password/olvide-password.component';
import { SupportGuardGuard } from './guards/support-guard.guard';
import { AdminGuardGuard } from './guards/admin-guard.guard';
import { TableroAtencionComponent } from './administrador/tablero-atencion/tablero-atencion.component';
import { EnviarReporteAdminComponent } from './administrador/enviar-reporte-admin/enviar-reporte-admin.component';
import { MensajesAdminComponent } from './administrador/mensajes-admin/mensajes-admin.component';
import { UserGuardGuard } from './guards/user-guard.guard';
import { InicioComponent } from './usuario/inicio/inicio.component';
import { SoporteInicioComponent } from './soporte/soporte-inicio/soporte-inicio.component';
import { AdministradorInicioComponent } from './administrador/administrador-inicio/administrador-inicio.component';
import { MensajesSoporteComponent } from './soporte/mensajes-soporte/mensajes-soporte.component';
import { AvisosComponent } from './administrador/avisos/avisos.component';
import { BuzonComponent } from './usuario/buzon/buzon.component';
import { MensajesReporteComponent } from './soporte/mensajes-reporte/mensajes-reporte.component';
import { PerfilAdministradorComponent } from './administrador/perfil-administrador/perfil-administrador.component';
import { PerfilComponent } from './usuario/perfil/perfil.component';
import { PerfilSoporteComponent } from './soporte/perfil-soporte/perfil-soporte.component';

const routes: Routes = [
  { path:'', redirectTo: '/auth/login', pathMatch: 'full' },
  { path: 'auth/login', component: LoginComponent },
  { path: 'auth/olvide-password', component: OlvidePasswordComponent},
  { path: 'admin/crear-usuario', component: CrearUsuarioComponent, canActivate: [AdminGuardGuard] },
  { path: 'admin/inicio', component: AdministradorInicioComponent, canActivate: [AdminGuardGuard] },
  { path: 'admin/perfil', component: PerfilAdministradorComponent, canActivate: [AdminGuardGuard] },
  { path: 'admin/usuarios', component: UsuariosComponent, canActivate: [AdminGuardGuard] },
  { path: 'admin/tablero', component: TableroAtencionComponent, canActivate: [AdminGuardGuard] },
  { path: 'admin/enviar-mensaje', component: EnviarReporteAdminComponent, canActivate: [AdminGuardGuard] },
  { path: 'admin/mensajes', component: MensajesAdminComponent, canActivate: [AdminGuardGuard] },
  { path: 'admin/avisos', component: AvisosComponent, canActivate: [AdminGuardGuard] },
  { path: 'user/inicio', component: InicioComponent, canActivate: [UserGuardGuard] },
  { path: 'user/perfil', component: PerfilComponent, canActivate: [UserGuardGuard] },
  { path: 'user/crear-reporte', component: SolicitudComponent, canActivate: [UserGuardGuard] },
  { path: 'user/mis-reportes', component: MisReportesComponent, canActivate: [UserGuardGuard] },
  { path: 'user/buzon', component: BuzonComponent, canActivate: [UserGuardGuard] },
  { path: 'support/inicio', component: SoporteInicioComponent, canActivate: [SupportGuardGuard] },
  { path: 'support/perfil', component: PerfilSoporteComponent, canActivate: [SupportGuardGuard] },
  { path: 'support/tablero-reportes', component: TableroSoporteComponent, canActivate: [SupportGuardGuard] },
  { path: 'support/tablero-soporte', component: TableroSolicitudesComponent, canActivate: [SupportGuardGuard] },
  { path: 'support/mensajes', component: MensajesSoporteComponent, canActivate: [SupportGuardGuard] },
  { path: 'support/mensajes-reporte', component: MensajesReporteComponent, canActivate: [SupportGuardGuard] },
  { path:'**', redirectTo: '/auth/login', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
