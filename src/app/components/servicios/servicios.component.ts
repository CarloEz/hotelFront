import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ReservaService } from 'src/app/services/reserva.service';

@Component({
  selector: 'app-servicios',
  templateUrl: './servicios.component.html',
  styleUrls: ['./servicios.component.css']
})
export class ServiciosComponent implements OnInit {

  tiposServicio:any;

  constructor(private reservaservice:ReservaService, private authService:AuthService) {
      this.reservaservice.servicios()
      .subscribe((res:any)=>{
        console.log(res);
        this.tiposServicio=res;
      })
   }

  ngOnInit(): void {
  }

  
  verRol(tipo:string):boolean{
    return this.authService.getType(tipo);
  }
}
