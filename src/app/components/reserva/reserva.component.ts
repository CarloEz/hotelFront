import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, Validators, FormControl } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { ReservaService } from 'src/app/services/reserva.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-reserva',
  templateUrl: './reserva.component.html',
  styleUrls: ['./reserva.component.css']
})
export class ReservaComponent implements OnInit {

  frmReserva: FormGroup;
  servicios: FormArray;
  tiposServicio: any;
  tiposHabitacion: any;
  totalHabitacion:number=0;
  calculoReserva:boolean=false;

  constructor(private reservaService: ReservaService, private authservice:AuthService,private toastr: ToastrService) {
    this.servicios = new FormArray([]);

    this.reservaService.servicios().subscribe((res: any) => {
      console.log(res);
      this.tiposServicio = res;
    })

    this.reservaService.tiposHabitacion().subscribe((res: any) => {
      console.log(res);
      this.tiposHabitacion = res;
    })

    this.frmReserva = new FormGroup({
      'numeroMayores': new FormControl(2, Validators.required),
      'numeroMenores': new FormControl(2),
      'fecha': new FormControl(''),
      'habitacion':this.getHabitacion(),
      'servicios': this.servicios,
      'total': new FormControl(0),
      'indexHabitacion': new FormControl(0, Validators.min(0)),
      'indexServicio': new FormControl(0, Validators.min(0)),
      'numServicio': new FormControl(0),
      'numHabitacion': new FormControl(0),
      'correo':new FormControl('')
    })
  }

  getHabitacion(){
    return new FormGroup({
      'tipo': new FormControl(null),
      'numero': new FormControl(0),
      'costo': new FormControl(0),
      'estado':new FormControl(null)
    });
  }

  getServicios() {
    return new FormGroup({
      'tipo': new FormControl(''),
      'numero': new FormControl(0),
      'costo': new FormControl(0)
    });
  }

  ngOnInit(): void {
  }

  agregarServicio(): void {
    let index = this.frmReserva.controls['indexServicio'].value;
    let objServicio = this.calcularServicio(index);
    let detalleServicio = this.getServicios();

    detalleServicio.patchValue(objServicio);
    this.frmReserva.controls['total'].setValue(this.frmReserva.controls['total'].value + objServicio.costo);
    this.servicios.controls.push(detalleServicio);
  }

  calcularReserva(): void {
    let index = this.frmReserva.controls['indexHabitacion'].value;
    let fechaInicial = new Date(this.frmReserva.controls['fecha'].value[0]);
    let fechaFinal = new Date(this.frmReserva.controls['fecha'].value[1]);
    let objDias= this.countDays(fechaInicial,fechaFinal);
    let objHabitacion = this.calcularHabitacion(index,objDias);

    this.frmReserva.controls['habitacion'].patchValue(objHabitacion);

    if(this.totalHabitacion>0){
      this.frmReserva.controls['total'].setValue(this.frmReserva.controls['total'].value-this.totalHabitacion);
    }

    this.frmReserva.controls['total'].setValue(this.frmReserva.controls['total'].value + objHabitacion.costo);
    this.totalHabitacion=objHabitacion.costo;
    this.calculoReserva=true;
  }

  calcularHabitacion(index: number, objDias:any): any {
    let numero = this.frmReserva.controls['numHabitacion'].value;
    let costofinSemana = this.tiposHabitacion[index].costo_fin * numero * objDias.countWeekendDays;
    let costoSemana = this.tiposHabitacion[index].costo_semana * numero * objDias.countWeek;
    let habitacion = this.tiposHabitacion[index].tipo;
    return {
      numero, 
      'costo':(costofinSemana+costoSemana),
      'tipo':habitacion,
      'estado':"reservadas"
    };
  }

  calcularServicio(index: number): any {
    let numero = this.frmReserva.controls['numServicio'].value;
    let costo = this.tiposServicio[index].costo * numero;
    let tipo = this.tiposServicio[index].tipo;
    return {
      numero, costo, tipo
    };
  }

  eliminarServicio(index:Required<number>):void{
    console.log(index);
    
    let servicio:any= this.servicios.controls[index];
    
    this.frmReserva.controls['total'].setValue(this.frmReserva.controls['total'].value-servicio.controls['costo'].value);

    this.servicios.removeAt(index);
  }

  crear(): void {
    if(this.calculoReserva === true){      
      let token=this.authservice.getToken();
      this.frmReserva.controls['correo'].setValue(this.authservice.getCorreo());
      
      this.reservaService.crearReserva(this.frmReserva.value,token)
      .subscribe((res:any)=>{   
        this.toastr.success(res.msg,'Reserva');
        this.frmReserva.reset();
        this.servicios.clear();
      })
    }else{
      this.toastr.info("Debes calcular reservación", "CALCULAR RESERVA");
    }
  }

  countDays(fechaInicial: Date, fechaFinal: Date) {
    let countWeekendDays = 0;
    let countWeek=0;
    while (fechaInicial <= fechaFinal) {
      if (fechaInicial.getDay() === 0 || fechaInicial.getDay() === 6) {
        countWeekendDays++;
      }else{
        countWeek++;
      }
      fechaInicial = new Date(fechaInicial.getTime() + 86400000);
    }
    return {
      countWeekendDays,
      countWeek
    };
  }
}