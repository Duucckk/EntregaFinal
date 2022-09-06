import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  //vamos a crear las variables necesarias:
  user: string;
  password: string;

  constructor(private toastController: ToastController, private router: Router, 
    private usuarioService: UsuarioService) { }

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
      message: 'Usuario o contraseña incorrectos!!!',
      duration: 3000
    });
    toast.present();
  }




}
