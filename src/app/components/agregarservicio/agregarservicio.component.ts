import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ReservaService } from 'src/app/services/reserva.service';

@Component({
  selector: 'app-agregarservicio',
  templateUrl: './agregarservicio.component.html'
})
export class AgregarservicioComponent implements OnInit {

  tiposServicio: any;
  reserva:string="";
  verificado:boolean=false;

  constructor(private reservaService: ReservaService, private toastr: ToastrService) {
    this.reservaService.servicios().subscribe((res: any) => {
      this.tiposServicio = res;
    })
  }

  ngOnInit(): void {
  }

  buscarReserva(): void {
    this.reserva = (document.getElementById('buscar') as HTMLInputElement).value;
    this.reservaService.buscar(this.reserva)
      .subscribe((res: any) => {       
        if(res.result){
          this.reserva= res.result[0].id;
          this.verificado=true;
          this.toastr.success("Se encontró su reserva", "Agregue servicios");
        }else{
          this.toastr.error("No se encontró su reserva", "Consulta");
        }
      });
  }

  agregarServicio(): void {
    let index = (document.getElementById('indexServicio') as HTMLInputElement).value;
    let objServicio = this.calcularServicio(index);

    this.reservaService.agregarServicio(objServicio)
      .subscribe((res: any) => {
        if(res.msg){
          this.toastr.success(res.msg, "Servicio");
        }else{
          this.toastr.error(res.error,"Servicio");
        }
      })
  }

  calcularServicio(index: any): any {
    let numero = (document.getElementById('numServicio') as HTMLInputElement).valueAsNumber;
    let costo = this.tiposServicio[index].costo * numero;
    let servicio = this.tiposServicio[index].tipo;
    let reserva =this.reserva;
    return {
      numero, costo, servicio, reserva
    };
  }
}