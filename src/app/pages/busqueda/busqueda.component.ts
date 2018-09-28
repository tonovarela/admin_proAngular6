import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { Usuario } from '../../models/usuario.model';
import { Hospital } from '../../models/hospital.model';
import { Medico } from '../../models/medico.model';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: []
})
export class BusquedaComponent implements OnInit {
  usuarios: Usuario[] = [];
  hospitales: Hospital[] = [];
  medicos: Medico[] = [];
  termino: string;

  constructor(public activatedRoute: ActivatedRoute, public _http: HttpClient) {
    activatedRoute.params.subscribe(params => {
      const termino = params['termino'];

      if (termino.length <= 0) {
        return;
      }
      this.buscar(termino);
    });
  }

  ngOnInit() {}

  buscar(termino: string) {
    const url = URL_SERVICIOS + '/busqueda/todo/' + termino;
    this._http.get(url).subscribe((resp: any) => {
      console.log(resp);
      this.termino = termino;
      this.hospitales = resp.hospitales;
      this.medicos = resp.medicos;
      this.usuarios = resp.usuarios;
    });
  }
}
