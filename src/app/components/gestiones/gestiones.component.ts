import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ReservaService } from 'src/app/services/reserva.service';

@Component({
  selector: 'app-gestiones',
  templateUrl: './gestiones.component.html',
  styleUrls: ['./gestiones.component.css']
})
export class GestionesComponent implements OnInit {

  empresa:any="";
  correo:any="";
  creditos:any=[{
    id:"",
    estado:"",
    dias:0
  }];

  constructor(private reservaService: ReservaService,private toastr: ToastrService) {
  }

  ngOnInit(): void {
  }

  agregarEmpresa():void{
    this.empresa = (document.getElementById('empresa') as HTMLInputElement).value;
    this.reservaService.crearempresa(this.empresa)
    .subscribe((res:any)=>{
      console.log(res);
      this.toastr.success(res.msg,'Empresa');
      this.empresa="";
    })  
  };

  verCredito(): void {
    this.correo = (document.getElementById('buscar') as HTMLInputElement).value;
    this.reservaService.vercredito(this.correo)
      .subscribe((res: any) => {
        console.log(res);
        this.creditos=res.result;
      });
  }
}
