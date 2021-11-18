import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { AppComponent } from './app.component';
import { ReservaComponent } from './components/reserva/reserva.component';
import { CheckinComponent } from './components/checkin/checkin.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HabitacionComponent } from './components/habitacion/habitacion.component';
import { ServiciosComponent } from './components/servicios/servicios.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { LoginComponent } from './components/usuario/login/login.component';
import { AdmloginComponent } from './components/usuario/admlogin/admlogin.component';
import { ToastrModule } from 'ngx-toastr';
import { GestionesComponent } from './components/gestiones/gestiones.component';
import { AgregarservicioComponent } from './components/agregarservicio/agregarservicio.component';
import { DisponibilidadComponent } from './components/disponibilidad/disponibilidad.component';

@NgModule({
  declarations: [
    AppComponent,
    ReservaComponent,
    CheckinComponent,
    CheckoutComponent,
    HabitacionComponent,
    ServiciosComponent,
    NavbarComponent,
    LoginComponent,
    AdmloginComponent,
    GestionesComponent,
    AgregarservicioComponent,
    DisponibilidadComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BsDatepickerModule.forRoot(),
    BrowserAnimationsModule,
    ToastrModule.forRoot(), // ToastrModule added
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
