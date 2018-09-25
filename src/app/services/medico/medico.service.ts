import { URL_SERVICIOS } from './../../config/config';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Medico } from '../../models/medico.model';
import { UsuarioService } from '../usuario/usuario.service';


@Injectable({
  providedIn: 'root'
})
export class MedicoService {
     totalMedicos: number = 0;


  constructor(
    public http: HttpClient,
    public _usuarioService: UsuarioService
  ) { }

  cargarMedicos(desde: number) {
    const url = URL_SERVICIOS + '/medico?desde=' + desde;

    return this.http.get(url).pipe(map((resp: any) => {
      this.totalMedicos = resp.total;
      return resp.medicos;
    })
  );

  }

  buscarMedicos(termino: string) {
    const url = URL_SERVICIOS + '/busqueda/coleccion/medicos/' + termino;
    return this.http.get(url).pipe(map((resp: any) => resp.medicos));
  }


  guardarMedico( medico: Medico) {
    let  url = URL_SERVICIOS + '/medico';
    if (medico._id) {
       url += '/' + medico._id;
       url += '?token=' + this._usuarioService.token;
       return this.http.put(url, {nombre: medico.nombre, id_hospital: medico.hospital._id}).pipe( map((resp: any) => resp.medico));
      // Actualizando
    } else {
       // Creando
       url += '?token=' + this._usuarioService.token;
       return this.http.post(url, medico).pipe ( map( (resp: any) => resp.medico ) );
    }


  }

   borrarMedico (id: string) {
    const url = URL_SERVICIOS + '/medico/' + id + '?token=' + this._usuarioService.token;
    return this.http.delete(url);
   }

   cargarMedico(id: string) {
    const url = URL_SERVICIOS + '/medico/' + id ;
    return this.http.get(url).pipe( map((resp: any) => resp.medico ));
   }
}
