import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  constructor() {
    this.cargarAjustes();
   }

  ajustes: Ajustes = {
    temaUrl: 'assets/css/colors/default.css',
    tema: 'default'
  };

  aplicarTema(color: string) {
    const url = `assets/css/colors/${color}.css`;
    document.getElementById('tema').setAttribute('href', url );
    this.ajustes.tema = color;
    this.ajustes.temaUrl = url;
    this.guardarAjustes();
  }

  cargarAjustes() {
    if (localStorage.getItem('ajustes')) {
      this.ajustes = JSON.parse(localStorage.getItem('ajustes'));
    //   //console.log('cargando del localstorage');
    // } else {
    //  // console.log('usando valores por defecto');
    }
    this.aplicarTema( this.ajustes.tema );
  }

  guardarAjustes() {
   // console.log('Guardando en el storage');
    localStorage.setItem('ajustes', JSON.stringify(this.ajustes));
  }

}

interface Ajustes {
temaUrl: string;
tema: string;
}


