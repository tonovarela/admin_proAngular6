
import { Router } from '@angular/router';
import { map, filter } from 'rxjs/operators';
import { URL_SERVICIOS } from './../../config/config';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Usuario } from '../../models/usuario.model';
import swal from 'sweetalert';
import { SubirArchivoService } from 'src/app/services/subir-archivo/subir-archivo.service';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  usuario: Usuario;
  token: string;
  constructor(public http: HttpClient,
    public router: Router,
    public _subirArchivoService: SubirArchivoService
  ) {
    this.cargarStorage();

  }
  crearUsuario(usuario: Usuario) {
    const url = URL_SERVICIOS + '/usuario';
    return this.http.post(url, usuario).pipe(
      map(resp => {
        swal('usuario Creado', usuario.email, 'success');
        return resp;
      })
    );
  }

  actualizarUsuario(usuario: Usuario) {
   let url = URL_SERVICIOS + '/usuario/' + usuario._id;
   url += '?token=' + this.token;
    return this.http.put(url, usuario).pipe(
      map((resp: any) => {
       const usuarioDB: Usuario = resp.usuario;
        this.guardarStorage(usuarioDB._id, this.token, usuarioDB );
        swal('Usuario actualizado', usuario.nombre, 'success');
        return true;
      })
    );
  }

  cargarStorage() {
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
    } else {
      this.token = '';
      this.usuario = null;
    }
  }

  estaLoguedo() {
    return (this.token.length > 5) ? true : false;
  }

  guardarStorage(id: string, token: string, usuario: Usuario) {
    localStorage.setItem('id', id);
    localStorage.setItem('usuario', JSON.stringify(usuario));
    localStorage.setItem('token', token);
    this.usuario = usuario;
    this.token = token;
  }

  logout() {
  this.usuario = null;
  this.token = '';
  localStorage.removeItem('token');
  localStorage.removeItem('usuario');
  this.router.navigate(['/login']);
  }

  loginGoogle(token: string) {
    const url = URL_SERVICIOS + '/login/google';
    return this.http.post(url, { token }).pipe(
      map( (resp: any) => {
       this.guardarStorage(resp.id, resp.token, resp.usuario);
       return true;
      })
    );
  }

  login(usuario: Usuario, recordar: boolean) {
    if (recordar) {
      localStorage.setItem('email', usuario.email);
    } else {
      localStorage.removeItem('email');
    }
    const url = URL_SERVICIOS + '/login';
    return this.http.post(url, usuario).pipe(
      map((resp: any) => {
        this.guardarStorage(resp.id, resp.token, resp.usuario);
        return true;
      })
    );
  }

  cambiarImagen (file: File ) {
    this._subirArchivoService.fileUpload(file, 'usuarios' , this.usuario._id).subscribe((resp: any) => {
      swal('Imagen Actualizada', resp.usuario.nombre , 'success');
      this.usuario.img = resp.usuario.img;
      this.guardarStorage(this.usuario._id, this.token, resp.usuario);
    

     console.log(resp.usuario.img);
    });
}
}
