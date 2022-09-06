import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  //variables necesarias para el trabajo del CRUD:
  usuarios: any[] = [
    {
      rut: '20.793.487-9',
      nom_completo: 'Diego Marquez',
      fecha_nac: '2002-11-10',
      semestre: 4,
      password: 'alumno123123',
      tipo_usuario: 'alumno',
      email: 'di.marquez@duoc.cl'
    },
    {
      rut: '00.000.000-0',
      nom_completo: 'admin',
      fecha_nac: '1111-11-11',
      semestre: 4,
      password: 'admin123123',
      tipo_usuario: 'admin',
      email: 'alumno@duocuc.cl'
    },
    {
      rut: '11.111.111-1',
      nom_completo: 'profesor',
      fecha_nac: '1111-11-11',
      semestre: 4,
      password: 'profesor123123',
      tipo_usuario: 'profesor',
      email: 'profesor@profesor.duoc.cl'
    }
  ];

  constructor() { }

  //métodos del CRUD:
  agregarUsuario(usuario): boolean{
    if ( this.obtenerUsuario(usuario.rut) == undefined ) {
      this.usuarios.push(usuario);
      return true;
    }
    return false;
  }
  eliminarUsuario(rut){
    this.usuarios.forEach((usu, index) => {
      if (usu.rut == rut) {
        this.usuarios.splice(index, 1);
      }
    });
  }
  modificarUsuario(usuario){
    var index = this.usuarios.findIndex(usu => usu.rut == usuario.rut);
    this.usuarios[index] = usuario;
  }
  obtenerUsuario(rut){
    return this.usuarios.find(usuario => usuario.rut == rut);
  }
  obtenerUsuarios(){
    return this.usuarios;
  }

  //MÉTODO CUSTOMER:
  //validar rut y contraseña: método que recibe rut y password y me entrega un JSON de un usuario
  validarRutPassword(rut, pass){
    return this.usuarios.find(u => u.rut == rut && u.password == pass);
  }
  validarMail(email){
    return this.usuarios.find(buscaMail => buscaMail.email == email)
  }
}
