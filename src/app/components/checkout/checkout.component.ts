import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ReservaService } from 'src/app/services/reserva.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  reserva: any;
  empresas: any;

  diferencia: any;
  objAbono: any = {
    abono: 0,
    reserva: ""
  }

  objCancelar:any={
    abono: 0,
    reserva: ""
  }

  objCredito: any = {
    dias: 0,
    reserva: "",
    empresa: ""
  }

  totales: any = {
    reserva:"",
    estado:"",
    abonos: 0,
    habitacion: 0,
    servicios: 0
  };

  constructor(private reservaService: ReservaService, private toastr: ToastrService) {
  }

  ngOnInit(): void {
  }

  agregarAbono(): void {
    this.objAbono.abono = (document.getElementById('abono') as HTMLInputElement).value;

    if (this.totales.reserva != "") {
      this.objAbono.reserva = this.totales.reserva;
      console.log(this.objAbono);
      this.reservaService.crearabono(this.objAbono)
        .subscribe((res: any) => {
          this.toastr.success(res.msg, 'Abono');
          this.objAbono.abono=0;
          this.buscarReserva();
        })
    }
  };

  buscarReserva(): void {
    this.reserva = (document.getElementById('buscar') as HTMLInputElement).value;
    this.reservaService.detalleReserva(this.reserva)
      .subscribe((res: any) => {
        console.log(res);
        this.totales = res;
        this.empresas = res.empresas;
        this.diferencia = this.totales.habitacion + this.totales.servicios - this.totales.abonos;
      });
  }

  cancelarReserva(): void { 
      this.objCancelar.abono = this.diferencia;
      this.objCancelar.reserva = this.totales.reserva;
      this.reservaService.pagar(this.objCancelar).subscribe((res: any) => {
        this.toastr.success(res.msg,"Reserva");
      })
  }

  creditoReserva():void {
    this.objCredito.dias=(document.getElementById('dias') as HTMLInputElement).value;
    this.objCredito.empresa= (document.getElementById('empresa') as HTMLInputElement).value;
  
    if ((this.objCredito.dias>0) && (this.objCredito.empresa!="")) {
      this.objCredito.reserva=this.totales.reserva;
      console.log(this.objCredito);
      this.reservaService.credito(this.objCredito)
      .subscribe((res:any)=>{
        this.toastr.success(res.msg,"Crédito");
      })
    }
  }
}