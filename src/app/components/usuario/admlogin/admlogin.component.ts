import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-admlogin',
  templateUrl: './admlogin.component.html',
})
export class AdmloginComponent implements OnInit {

  frmregister;frmlogin:FormGroup;

  constructor(private authservice:AuthService,private router:Router, private toastr:ToastrService) {
    this.frmregister = new FormGroup({
      'nombre': new FormControl('', Validators.required),
      'correo': new FormControl('', [Validators.required, Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$")]),
      'contraseña': new FormControl('', Validators.required),
      'rol':new FormControl('trabajador')
    })

    this.frmlogin = new FormGroup({
      'correo': new FormControl('', [Validators.required, Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$")]),
      'contraseña': new FormControl('', Validators.required),
      'rol':new FormControl('trabajador')
    })
  }

  ngOnInit(): void {
  }


  iniciarSesion(): void {
    this.authservice.postLogin(this.frmlogin.value).subscribe((data: any) => {
      if (data.msg) {
        console.log(data);
        localStorage.setItem('token', data.msg);
        this.router.navigate(['/admin/checkin']);
      } else {
        this.toastr.error(data.error, "Ingreso");
      }
    });
  }


  guardar():void{
    this.authservice.postRegistro(this.frmregister.value)
    .subscribe( (data:any)=>{
      if (data.msg) {
        this.toastr.success(data.msg, 'Registro');
        this.router.navigate(['/cliente/reservar']);
      } else if (data.error) {
        this.toastr.error(data.error, 'Registro');
      }
    });
  }

}
