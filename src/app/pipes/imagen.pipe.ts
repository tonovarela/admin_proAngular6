import { URL_SERVICIOS } from './../config/config';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(img: string, tipo: string = 'usuario'): any {
    let url = URL_SERVICIOS + '/imagenes/';
    if (!img) {
      console.log(url + '/usuarios/XXXXX');
     return url + '/usuarios/XXXXX';
    }
    if (img.indexOf('https') >= 0) {
      return img;
    }
    switch (tipo) {
      case 'usuario':
       url += '/usuarios/' + img;
        break;
        case 'medico':
        url += '/medicos/' + img;
        break;
        case 'hospital':
         url += '/hospitales/' + img;
        break;

      default:
      console.log('Solo se permiten tipos medicos, hospitales y usuarios');
       url += '/usuarios/XXXXX';
        break;
    }
    return url;
  }

}
