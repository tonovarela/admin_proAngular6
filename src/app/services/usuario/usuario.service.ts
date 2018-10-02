import { Router } from '@angular/router';
import { map, filter, catchError } from 'rxjs/operators';
import { URL_SERVICIOS } from './../../config/config';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Usuario } from '../../models/usuario.model';
import swal from 'sweetalert';
import { SubirArchivoService } from 'src/app/services/subir-archivo/subir-archivo.service';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  usuario: Usuario;
  token: string;
  menu: any;
  constructor(
    public http: HttpClient,
    public router: Router,
    public _subirArchivoService: SubirArchivoService,
    public  _modalUploadService: ModalUploadService
  ) {
    this.cargarStorage();
    // Actualiza la imagen del usuario logueado
    this._modalUploadService.notificacion.subscribe(resp => {
      // if (this.usuario._id === resp.usuario._id ) {
      //    this.guardarStorage(this.usuario._id, this.token, resp.usuario);
      // }
    });
  }

  renuevaToken() {
    const url = URL_SERVICIOS + '/login/renuevatoken?token=' + this.token;
    return this.http.get(url).pipe( map( (resp: any) => {
      localStorage.setItem('token', resp.token);
      console.log('Token renovado');
       this.token = resp.token;
       return true;
    }), catchError ((err: any) => {
                this.router.navigate(['/login']);
                 this.mostrarMensajeError('No se pudo renovar token', '');
                 return throwError(err);
               })
    );
  }

  mostrarMensajeError(titulo: string, mensaje: string) {
    swal(titulo, mensaje , 'error');

  }

  crearUsuario(usuario: Usuario) {
    const url = URL_SERVICIOS + '/usuario';
    console.log(url);
    console.log(usuario);
    return this.http.post(url, usuario).pipe(
      map(resp => {
        swal('usuario Creado', usuario.email, 'success');
        return resp;
      }), catchError ( err => {
        console.log(err);
        this.mostrarMensajeError(err.error.mensaje, err.error.errors.message ) ;
        return throwError(err);
      } )
    );
  }

  actualizarUsuario(usuario: Usuario) {
    let url = URL_SERVICIOS + '/usuario/' + usuario._id;
    url += '?token=' + this.token;
    return this.http.put(url, usuario).pipe(
      map((resp: any) => {
        if (usuario._id === this.usuario._id) {
          const usuarioDB: Usuario = resp.usuario;
          this.guardarStorage(usuarioDB._id, this.token, usuarioDB, this.menu);
        }
        swal('Usuario actualizado', usuario.nombre, 'success');
        return true;
      }) , catchError ( err => {
        console.log(err);
        this.mostrarMensajeError(err.error.mensaje, err.error.errors.message ) ;
        return throwError(err);
      } )
    );
  }

  cargarStorage() {
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
      this.menu = JSON.parse(localStorage.getItem('menu'));
    } else {
      this.token = '';
      this.usuario = null;
      this.menu  = null;
    }
  }

  estaLoguedo() {
    return this.token.length > 5 ? true : false;
  }

  guardarStorage(id: string, token: string, usuario: Usuario, menu: any) {
    localStorage.setItem('menu', JSON.stringify(menu));
    localStorage.setItem('id', id);
    localStorage.setItem('usuario', JSON.stringify(usuario));
    localStorage.setItem('token', token);
    this.usuario = usuario;
    this.token = token;
    this.menu = menu;
  }

  logout() {
    this.usuario = null;
    this.token = '';
    this.menu = '';
    localStorage.removeItem('menu');
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    this.router.navigate(['/login']);
  }

  loginGoogle(token: string) {
    const url = URL_SERVICIOS + '/login/google';
    return this.http.post(url, { token }).pipe(
      map((resp: any) => {
        this.menu = resp.menu;
        this.guardarStorage(resp.id, resp.token, resp.usuario, this.menu);
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
        this.menu = resp.menu;
        this.guardarStorage(resp.id, resp.token, resp.usuario, resp.menu);
        return true;
      }), catchError ( err => {
        console.log(err.error.mensaje);
        this.mostrarMensajeError('Error en el login', err.error.mensaje );
        return throwError(err);
      } )
    );
  }

  cambiarImagen(file: File) {
    this._subirArchivoService
      .fileUpload(file, 'usuarios', this.usuario._id)
      .subscribe((resp: any) => {
        swal('Imagen Actualizada', resp.usuario.nombre, 'success');
        this.usuario.img = resp.usuario.img;
        this.guardarStorage(this.usuario._id, this.token, resp.usuario, this.menu);
        // console.log(resp.usuario.img);
      });
  }

  cargarUsuarios(desde: number = 0) {
    const url = URL_SERVICIOS + '/usuario?desde=' + desde;
    return this.http.get(url);
  }

  buscarUsuarios(termino: string) {
    const url = URL_SERVICIOS + '/busqueda/coleccion/usuarios/' + termino;
    return this.http.get(url).pipe(map((resp: any) => resp.usuarios));
  }

  borrarUsuario(id: String) {
    const url = URL_SERVICIOS + '/usuario/' + id + '?token=' + this.token;
    return this.http.delete(url).pipe(
      map(resp => {
        swal('Borrado!', 'El usuario borrado', 'success');
        return true;
      })
    );
  }
}
