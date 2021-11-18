import { Component, OnInit } from '@angular/core';
import { ReservaService } from 'src/app/services/reserva.service';

@Component({
  selector: 'app-habitacion',
  templateUrl: './habitacion.component.html',
  styleUrls: ['./habitacion.component.css']
})
export class HabitacionComponent implements OnInit {
  public tiposHabitaciones: any=[];

  constructor(private reservaservice: ReservaService) {
    this.reservaservice.tiposHabitacion()
      .subscribe((res: any) =>{ 
        console.log(res);
        this.tiposHabitaciones = res}
        );
  }

  ngOnInit(): void {
  }

}
