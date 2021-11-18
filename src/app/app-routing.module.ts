import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckinComponent } from './components/checkin/checkin.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { DisponibilidadComponent } from './components/disponibilidad/disponibilidad.component';
import { GestionesComponent } from './components/gestiones/gestiones.component';
import { HabitacionComponent } from './components/habitacion/habitacion.component';
import { ReservaComponent } from './components/reserva/reserva.component';
import { ServiciosComponent } from './components/servicios/servicios.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { AdmloginComponent } from './components/usuario/admlogin/admlogin.component';
import { LoginComponent } from './components/usuario/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { AuthclienteGuard } from './guards/authcliente.guard';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'panel/habitaciones' },
  {
    path: 'panel', component: NavbarComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'habitaciones', component: HabitacionComponent },
      { path: 'servicios', component: ServiciosComponent },
      { path: '**', redirectTo: 'habitaciones' }
    ]
  },
  { path: 'empresa', component: AdmloginComponent },
  {
    path: 'cliente', component: NavbarComponent, canActivateChild: [AuthclienteGuard],
    children: [
      { path: 'reservar', component: ReservaComponent }
    ]
  },
  {
    path: 'admin', component: NavbarComponent, canActivateChild: [AuthGuard],
    children: [
      { path: 'checkin', component: CheckinComponent },
      { path: 'checkout', component: CheckoutComponent },
      { path: 'gestiones', component: GestionesComponent },
      { path: 'disponibles', component: DisponibilidadComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
