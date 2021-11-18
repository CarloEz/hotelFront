import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class ReservaService {

  private API:string="http://localhost:3000/";

  constructor(private http:HttpClient) { }

  tiposHabitacion():any{
    return this.http.get("../../assets/tiposhabitacion.json");
  }

  editarDisponibilidad():any{
    return this.http.post("../../assets/tiposhabitacion.json",{msg:"OK"});
  }

  servicios():any{
    return this.http.get("../../assets/servicios.json");
  }

  editarservicio(servicio:any):any{
    return this.http.put(`${this.API}reserva/editar/servicio/${servicio.id}`,servicio);
  }

  buscar(reserva:any):any{
    return this.http.get(`${this.API}reserva/${reserva}`);
  }

  crearReserva(form:any, usuario:any):any{
    return this.http.post(`${this.API}reserva/${usuario}`,form);
  }

  checkIn(reserva:any):any{
    return this.http.put(`${this.API}reserva/checkin/${reserva.id}`,reserva);
  }

  detalleReserva(reserva:any):any{
    return this.http.get(`${this.API}reserva/estado/${reserva}`);
  }

  pagar(pago:any):any{
    return this.http.post(`${this.API}reserva/cancelar`, pago);
  }

  credito(reserva:any):any{
    return this.http.post(`${this.API}reserva/credito`, reserva);
  }

  vercredito(correo:any):any{
    return this.http.post(`${this.API}reserva/creditos`, {correo});
  }

  crearempresa(empresa:any):any{
    return this.http.post(`${this.API}reserva/empresa`,{"empresa":empresa});
  }

  crearabono(abono:any):any{
    return this.http.post(`${this.API}reserva/abono`,abono);
  }

  agregarServicio(servicio:any){
    return this.http.post(`${this.API}reserva/servicio`,servicio);
  }

  disponibilidad(fecha:any){
    return this.http.post(`${this.API}reserva/disponibilidad`,{fecha});
  }

  liberar(id:any){
    return this.http.put(`${this.API}reserva/liberar/${id}`,{estado:"disponible"});
  }
}