import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from '../../config/config';
import { HttpClient } from '@angular/common/http';
import { UsuarioService } from '../service.index';
import { map } from 'rxjs/operators';
import { Hospital } from '../../models/hospital.model';


@Injectable({
  providedIn: 'root'
})
export class HospitalService {
  private url: string;
  constructor(public http: HttpClient,
    public _usuarioService: UsuarioService ) {
console.log('Hospital');
}

private obtenerUrl() {
  return URL_SERVICIOS;
}

  cargarHospitales(desde: number) {
    const url = this.obtenerUrl() + '/hospital?desde=' + desde;
    return this.http.get(url);
  }

  obtenerHospital(id: string) {
   const url = this.obtenerUrl() + '/hospital/' + id;
   return this.http.get(url).pipe(map((resp: any) => resp.hospital));
  }

  borrarHospital(id: string) {
    const url = this.obtenerUrl() + '/hospital/' + id + '?token=' + this._usuarioService.token;
    return this.http.delete(url);
  }
   crearHospital (nombre: string) {
   const url = this.obtenerUrl() + '/hospital?token=' + this._usuarioService.token;
   return this.http.post(url, { nombre });
   }

   buscarHospital(termino: string) {
    const url = this.obtenerUrl() + '/busqueda/coleccion/hospitales/' + termino;
    return this.http.get(url).pipe( map((resp: any) => resp.hospitales));
  }

  actualizarHospital(hospital: Hospital) {
    const url = this.obtenerUrl() + '/hospital/' + hospital._id + '?token=' + this._usuarioService.token;
    return this.http.put(url , {nombre: hospital.nombre});
  }

  // borrarHospital( id: string ): Recibe un ID de un hospital y lo borra
  // • crearHospital( nombre: string ): Recibe el nombre del hospital y lo crea.
  // • buscarHospital( termino: string ): Recibe el término de búsqueda y retorna todos los
  // hospitales que coincidan con ese término de búsqueda.
  // • actualizarHospital( hospital: Hospital ): Recibe un hospital y lo actualiza.

}
