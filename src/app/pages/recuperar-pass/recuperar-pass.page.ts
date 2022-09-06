import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
@Component({
  selector: 'app-recuperar-pass',
  templateUrl: './recuperar-pass.page.html',
  styleUrls: ['./recuperar-pass.page.scss'],
  
})
export class RecuperarPassPage implements OnInit {
  user: string;
  password: string;
  email: string;

  constructor(private toastController: ToastController, private router: Router, 
    private usuarioService: UsuarioService, public alertCtrl: AlertController) { }

  ngOnInit() {
  }
  //método para ingresar a home:
  login(){
    var usuarioLogin = this.usuarioService.validarRutPassword(this.user, this.password);

    //validar que al ingresar admin admin en el formulario, me diga hola:
    if (usuarioLogin != undefined) {
      if (usuarioLogin.tipo_usuario == 'admin') {
        this.router.navigate(['/home']);
      }else{
        if(usuarioLogin.tipo_usuario == 'alumno'){
          this.router.navigate(['/alumno']);
        }else{
          this.router.navigate(['/profesor']);
        }
        
      }
    }else{
      this.tostadaError();
    }
  }

  //toast
  async tostadaError() {
    const toast = await this.toastController.create({
      message: 'Email no valido!!!',
      duration: 3000
    });
    toast.present();
  }
//ESTA ES LA FUNCION CON LA QUE SE REALIZO EL PROCESO DE VALIDACION DE USUARIO Y RECUPERACION DE CONTRASENA
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
