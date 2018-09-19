import { NgForm } from '@angular/forms';
import { UsuarioService } from './../../services/service.index';
import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit {
  usuario: Usuario;
  imagenSubir: File;
  imagenTemp: string;
  constructor(public _usuarioService: UsuarioService) {
    this.usuario = this._usuarioService.usuario;
  }

  ngOnInit() {}
  seleccionImagen(archivo: File) {
    if (!archivo) {
      this.imagenSubir = null;
      return;
    }
   if (archivo.type.indexOf('image') < 0 ) {
     swal('Solo se permiten imagenes', 'el archivo seleccionado no es una imagen', 'danger');
     this.imagenSubir = null;
     return;
   }

    this.imagenSubir = archivo;

    const reader = new FileReader();
    const urlImagenTemp = reader.readAsDataURL(archivo);
    reader.onloadend = ()  => {
    this.imagenTemp = reader.result;
    };

  }
  cambiarImagen() {
    this._usuarioService.cambiarImagen(this.imagenSubir);
  }
  guardar(usuario: Usuario) {
    this.usuario.nombre = usuario.nombre;
    if (!this.usuario.google) {
      this.usuario.email = usuario.email;
    }

    this._usuarioService.actualizarUsuario(this.usuario).subscribe();
  }
}
