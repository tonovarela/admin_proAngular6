import { URL_SERVICIOS } from './../../config/config';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SubirArchivoService {

  constructor(public _http: HttpClient) { }

  fileUpload(archivo: File, tipo: string , id: string) {
    const url = URL_SERVICIOS + '/upload/' + tipo + '/' + id;
    const formData = new FormData();
    formData.append('imagen', archivo, archivo.name);
    return this._http.put(url, formData, { reportProgress: true });


  }

  // subirArchivo(archivo: File, tipo: string , id: string) {
  //   return new Promise((resolve, reject) => {
  //     const formData = new FormData();
  //     const xhr = new XMLHttpRequest();
  //     formData.append('imagen', archivo, archivo.name);
  //     xhr.onreadystatechange = function() {
  //          if (xhr.readyState === 4 ) {
  //          if  (xhr.status === 200 ) {
  //            resolve(xhr.response);
  //          } else {
  //           reject(xhr.response);
  //          }

  //     }
  //     };
  //     const url = URL_SERVICIOS + '/upload/' + tipo + '/' + id;
  //     xhr.open('PUT', url, true);
  //     xhr.send(formData);
  // }
  // );
  // }
}
