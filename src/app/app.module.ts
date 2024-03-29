import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AngularFireStorageModule } from '@angular/fire/compat/storage'
import { AppRoutingModule } from './app-routing.module';
import { AngularFireModule } from '@angular/fire/compat';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { environment } from 'src/environments/environment';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './usuario/header/header.component';
import { HeaderAdminComponent } from './administrador/header-admin/header-admin.component';
import { SolicitudComponent } from './usuario/solicitud/solicitud.component';
import { CrearUsuarioComponent } from './administrador/crear-usuario/crear-usuario.component';
import { UsuariosComponent } from './administrador/usuarios/usuarios.component';
import { HeaderSoporteComponent } from './soporte/header-soporte/header-soporte.component';
import { MisReportesComponent } from './usuario/mis-reportes/mis-reportes.component';
import { PerfilComponent } from './usuario/perfil/perfil.component';
import { TableroSoporteComponent } from './soporte/tablero-soporte/tablero-soporte.component';
import { TableroSolicitudesComponent } from './soporte/tablero-solicitudes/tablero-solicitudes.component';
import { OlvidePasswordComponent } from './olvide-password/olvide-password.component';
import { TableroAtencionComponent } from './administrador/tablero-atencion/tablero-atencion.component';
import { EnviarReporteAdminComponent } from './administrador/enviar-reporte-admin/enviar-reporte-admin.component';
import { MensajesAdminComponent } from './administrador/mensajes-admin/mensajes-admin.component';
import { InicioComponent } from './usuario/inicio/inicio.component';
import { SoporteInicioComponent } from './soporte/soporte-inicio/soporte-inicio.component';
import { AdministradorInicioComponent } from './administrador/administrador-inicio/administrador-inicio.component';
import { PerfilAdministradorComponent } from './administrador/perfil-administrador/perfil-administrador.component';
import { MensajesSoporteComponent } from './soporte/mensajes-soporte/mensajes-soporte.component';
import { AvisosComponent } from './administrador/avisos/avisos.component';
import { BuzonComponent } from './usuario/buzon/buzon.component';
import { MensajesReporteComponent } from './soporte/mensajes-reporte/mensajes-reporte.component';
import { PerfilSoporteComponent } from './soporte/perfil-soporte/perfil-soporte.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    HeaderAdminComponent,
    SolicitudComponent,
    CrearUsuarioComponent,
    UsuariosComponent,
    HeaderSoporteComponent,
    MisReportesComponent,
    PerfilComponent,
    TableroSoporteComponent,
    TableroSolicitudesComponent,
    OlvidePasswordComponent,
    TableroAtencionComponent,
    EnviarReporteAdminComponent,
    MensajesAdminComponent,
    InicioComponent,
    SoporteInicioComponent,
    AdministradorInicioComponent,
    PerfilAdministradorComponent,
    MensajesSoporteComponent,
    AvisosComponent,
    BuzonComponent,
    MensajesReporteComponent,
    PerfilSoporteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    AngularFireStorageModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
