import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.page.html',
  styleUrls: ['./registrar.page.scss'],
})


export class RegistrarPage implements OnInit {
  private emailAlumno: any = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@duoc.u((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  private emailAdmin: any = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@duo((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  private emailProfe: any = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@profesor.duo((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ ;
  //VAMOS A CREAR EL GRUPO DEL FORMULARIO:
  alumno = new FormGroup({
    //Validador de rut TIENE QUE SER UNO EN SERIO SIPO
    rut : new FormControl('', [Validators.required, Validators.pattern('[0-9]{1,2}.[0-9]{3}.[0-9]{3}-[0-9kK]{1}')]),
    nom_completo: new FormControl('', [Validators.required, Validators.minLength(3)]),
    //validador de fecha TIENE QUE SER IGUAL O MAYOR A 17
    fecha_nac: new FormControl('', Validators.required),
    semestre: new FormControl('', [Validators.required, Validators.min(1), Validators.max(8)]),
    password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(18)]),
    tipo_usuario: new FormControl('alumno'),
    //Validador de email SIN LA WEA DE DUOC
    email: new FormControl('', [Validators.required, Validators.minLength(5), Validators.pattern(this.emailAlumno)])
    
  });

  profesor = new FormGroup({
    //Validador de rut TIENE QUE SER UNO EN SERIO SIPO
    rut : new FormControl('', [Validators.required, Validators.pattern('[0-9]{1,2}.[0-9]{3}.[0-9]{3}-[0-9kK]{1}')]),
    nom_completo: new FormControl('', [Validators.required, Validators.minLength(3)]),
    //validador de fecha TIENE QUE SER IGUAL O MAYOR A 17
    fecha_nac: new FormControl('', Validators.required),
    semestre: new FormControl('', [Validators.required, Validators.min(1), Validators.max(8)]),
    password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(18)]),
    tipo_usuario: new FormControl('alumno'),
    //Validador de email SIN LA WEA DE DUOC
    email: new FormControl('', [Validators.required, Validators.minLength(5), Validators.pattern(this.emailProfe)])
  });

  //VAMOS A CREAR UNA VARIABLE PARA OBTENER LA LISTA DE USUARIOS DEL SERVICIO DE USUARIOS:
  //usuarios: any[] = [];
  verificar_password: string;
  email: string;
  constructor(private usuarioService: UsuarioService, private router: Router, public alertCtrl: AlertController,private toastController: ToastController) { }

  ngOnInit() {
    //this.usuarios = this.usuarioService.obtenerUsuarios();
  }

  //método del formulario
  registrar(){
    if (this.alumno.controls.password.value != this.verificar_password) {
      alert('CONTRASEÑAS NO COINCIDEN!');
      return;
    }
    this.usuarioService.agregarUsuario(this.alumno.value);
    alert('ALUMNO REGISTRADO!');
    this.router.navigate(['/login']);
    //this.alumno.reset();
    //this.verificar_password = '';
  }

  async tostadaError() {
    const toast = await this.toastController.create({
      message: 'Email no valido!!!',
      duration: 3000
    });
    toast.present();
  }

  async alerta(){
    var usuarioLogin = this.usuarioService.validarMail(this.email);
    if (usuarioLogin != undefined) {
      if (usuarioLogin.tipo_usuario == 'admin') {
        const alert = await this.alertCtrl.create({
          header: 'Solicitud Realizada!',
          subHeader: 'Administrador! Por favor, ingresa a tu correo',
          message: 'Hemos enviado un correo electronico para reestablecer tu contraseña, revisa tu bandeja de entrada!',
          buttons: ['OK']
        });
        await alert.present();
      }else{
        if(usuarioLogin.tipo_usuario == 'alumno'){
          const alert = await this.alertCtrl.create({
            header: 'Solicitud Realizada!',
            subHeader: 'Alumno! Por favor, ingresa a tu correo',
            message: 'Hemos enviado un correo electronico para reestablecer tu contraseña, revisa tu bandeja de entrada!',
            buttons: ['OK']
          });
          await alert.present();
        }else if(usuarioLogin.tipo_usuario == 'profesor'){
          const alert = await this.alertCtrl.create({
            header: 'Solicitud Realizada!',
            subHeader: 'Profesor! Por favor, ingresa a tu correo',
            message: 'Hemos enviado un correo electronico para reestablecer tu contraseña, revisa tu bandeja de entrada!',
            buttons: ['OK']
        });
        await alert.present();

      }
    }

    //aqui
  }else{
    this.tostadaError();
  }
}
}
