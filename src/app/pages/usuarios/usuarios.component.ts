
import { Usuario } from './../../models/usuario.model';
import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/service.index';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';
declare var swal: any;
@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})
export class UsuariosComponent implements OnInit {
    usuarios: Usuario[] = [];
    desde: number = 0;
    cargando: boolean = true;
    totalRegistros: number = 0;
  constructor(public _usuarioService: UsuarioService,
              public _modalUploadService: ModalUploadService) { }

  ngOnInit() {
    this.cargarUsuarios();
    this._modalUploadService.notificacion.subscribe( resp => {
      this.cargarUsuarios();
    } );
  }

  mostrarModal(usuario: Usuario) {
    this._modalUploadService.mostrarModal('usuarios', usuario._id);

  }

  cargarUsuarios() {
    this.cargando = true;
    this._usuarioService.cargarUsuarios(this.desde).subscribe((resp: any) => {
      this.totalRegistros = resp.total;
      this.usuarios = resp.usuarios;
      this.cargando = false;
    });

  }
  cambiarDesde(valor: number) {
    const desde = this.desde + valor ;
    if (desde >= this.totalRegistros || desde < 0) {
      return ;
    }
   this.desde += valor ;
   this.cargarUsuarios();

  }

  buscarUsuarios(termino: string) {
    if (termino.length <= 0) {
    this.cargarUsuarios();
    return;
    }
    this.cargando = true;
    this._usuarioService.buscarUsuarios(termino).subscribe((resp: Usuario[]) => {
     this.usuarios = resp;
     this.cargando = false;
    });

  }

  guardarUsuario(usuario: Usuario) {
    this._usuarioService.actualizarUsuario(usuario)
    .subscribe();
  }

   borrarUsuario(usuario: Usuario) {
    if (usuario._id === this._usuarioService.usuario._id) {
      swal('No se puede borrar usuario', 'No se puede borrar a si mismo', 'error');
      return;
    }

    swal({
      title: 'Estas seguro?',
      text: 'Esta a punto de borrar a ' + usuario.nombre,
      icon: 'warning',
      buttons: true ,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
         this._usuarioService.borrarUsuario(usuario._id)
         .subscribe( resp => {
          console.log(resp);
          this.cargarUsuarios();
          this.desde = 0;
         });
      }
    });


   }

}
