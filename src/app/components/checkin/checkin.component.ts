import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { ReservaService } from 'src/app/services/reserva.service';

@Component({
  selector: 'app-checkin',
  templateUrl: './checkin.component.html',
  styleUrls: ['./checkin.component.css']
})
export class CheckinComponent implements OnInit {

  buscar:any;
  frmReserva: FormGroup;
  servicios: FormArray;
  habitacion:FormGroup;
  tiposServicio: any=[];
  tiposHabitacion: any;

  constructor(private reservaService: ReservaService, private authservice: AuthService, private toastr:ToastrService) {
    this.reservaService.servicios().subscribe((res: any) => {
      console.log(res);
      this.tiposServicio = res;
    })

    this.reservaService.tiposHabitacion().subscribe((res: any) => {
      console.log(res);
      this.tiposHabitacion = res;
    })

    this.servicios = new FormArray([]);
    this.habitacion = this.getHabitacion();
  
    this.frmReserva = new FormGroup({
      'id':new FormControl(''),
      'estado':new FormControl(''),
      'numero_adultos': new FormControl(2, Validators.required),
      'numero_menores': new FormControl(2),
      'fecha_entrada': new FormControl(''),
      'fecha_salida': new FormControl(''),
      'habitacion': this.habitacion,
      'servicios': this.servicios,
      'total': new FormControl(0),
      'indexServicio': new FormControl(0, Validators.min(0)),
      'numServicio': new FormControl(0)
    })
  }

  ngOnInit(): void {
  }

  getHabitacion():FormGroup {
    return new FormGroup({
      'tipo_habitacion': new FormControl(''),
      'numero': new FormControl(0),
      'costo': new FormControl(0)
    });
  }

  agregarServicio(servicio:any): void {
    let detalleServicio= this.getServicios();
    detalleServicio.patchValue(servicio);
    this.frmReserva.controls['total'].setValue(this.frmReserva.controls['total'].value + detalleServicio.controls['costo'].value);
    this.servicios.controls.push(detalleServicio);
  }

  getServicios() {
    return new FormGroup({
      'id':new FormControl(''),
      'servicio': new FormControl(''),
      'numero': new FormControl(0),
      'costo': new FormControl(0)
    });
  }

  actualizar(index:Required<number>):void{
    let objServicio = this.getServicios();
    console.log("SERVICIO:", this.servicios.controls[index]);
    objServicio.patchValue(this.servicios.controls[index].value);
    let objTipo= this.tiposServicio.find( (element:any)=> element.tipo==="Desayuno");
    objServicio.controls['costo'].setValue(objTipo.costo * objServicio.controls['numero'].value);
    
    this.reservaService.editarservicio(objServicio.value)
    .subscribe((res:any) => {
      console.log(res);
      this.toastr.success(res.msg,"Servicio");
      this.buscarReserva();
    });
    
  }

  buscarReserva(): void {
    this.servicios.clear();
    this.frmReserva.reset();
    
    this.buscar = (document.getElementById('buscar') as HTMLInputElement).value;
    this.reservaService.buscar(this.buscar)
    .subscribe((res: any) => {
        this.frmReserva.patchValue(res.result[0]);
        this.frmReserva.controls['habitacion'].patchValue(res.resultHabitacion[0]);
        this.frmReserva.controls['total'].setValue(this.frmReserva.controls['total'].value+ res.resultHabitacion[0].costo);
        
        res.resultServicio.forEach((servicio:any) => {
            this.agregarServicio(servicio); 
        });
      });
  }

  estado():void{
    this.frmReserva.controls['estado'].setValue('checkin');

    this.reservaService.checkIn(this.frmReserva.value)
    .subscribe((res:any)=>{
      this.toastr.success(res.msg, "CHECK IN");
    })
  }
}
