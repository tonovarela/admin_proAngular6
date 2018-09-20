import { Component, OnInit } from '@angular/core';
import { SubirArchivoService  } from '../../services/service.index';
import { ModalUploadService } from './modal-upload.service';


@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styleUrls: []
})
export class ModalUploadComponent implements OnInit {
  imagenSubir: File;
  imagenTemp: string;

  constructor(public _subirArchivoService: SubirArchivoService,
  public _modalUploadService: ModalUploadService) {
  }

  ngOnInit() {
  }
   subirImagen() {
     this._subirArchivoService.fileUpload(this.imagenSubir, this._modalUploadService.tipo, this._modalUploadService.id )
     .subscribe( (resp) => {
       this._modalUploadService.notificacion.emit(resp);
       this.cerrarModal();
     } );
   }

   cerrarModal() {
     this.imagenSubir = null;
     this.imagenTemp = null;
   this._modalUploadService.ocultarModal();
   }
  seleccionImagen(archivo: File) {
    if (!archivo) {
      this.imagenSubir = null;
      return;
    }
   if (archivo.type.indexOf('image') < 0 ) {
     swal('Solo se permiten imagenes', 'el archivo seleccionado no es una imagen', 'error');
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

}
