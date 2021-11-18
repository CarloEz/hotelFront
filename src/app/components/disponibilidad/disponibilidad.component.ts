import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ReservaService } from 'src/app/services/reserva.service';

@Component({
  selector: 'app-disponibilidad',
  templateUrl: './disponibilidad.component.html',
  styleUrls: ['./disponibilidad.component.css']
})
export class DisponibilidadComponent implements OnInit {
  tiposHabitacion: any;
  objDisponibilidad:any=[];

  constructor(private reservaService:ReservaService, private toastr:ToastrService) {
    this.reservaService.tiposHabitacion().subscribe((res: any) => {
      console.log(res);
      this.tiposHabitacion = res;
    })
  }

  ngOnInit(): void {  }

  disponibilidad():void{
    let fecha=(document.getElementById('fecha') as HTMLInputElement).value;
    this.reservaService.disponibilidad(fecha).subscribe((res:any)=>{
      this.objDisponibilidad=res;
    })
  }

  liberar(id:any):void{
    this.reservaService.liberar(id)
    .subscribe((res:any)=>{
      if(res.msg){
        this.toastr.success(res.msg,"Mensaje");
        this.disponibilidad();
      }
    })
  }
}
