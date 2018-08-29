import { Component, OnInit } from '@angular/core';
import { Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { forEach } from '@angular/router/src/utils/collection';
 import { SettingsService } from '../../services/service.index';


@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: []
})
export class AccountSettingsComponent implements OnInit {

  constructor(@Inject(DOCUMENT) private _document , public _ajustes: SettingsService) { }

  ngOnInit() {
    this.colocarCheck();
  }
  cambiarColor(color: string, link: any) {
    console.log(color);
    this.aplicarCheck(link);
    this._ajustes.aplicarTema( color );
    // this._document.getElementById('tema').setAttribute('href', url );

  }

  aplicarCheck(link: any) {
     const selectores: any = document.getElementsByClassName('working');
      for ( const ref of selectores ) {
      ref.classList.remove('working');
      }
      link.classList.add('working');


}

colocarCheck() {
  const selectores: any = document.getElementsByClassName('selector');
  const tema = this._ajustes.ajustes.tema;
  for ( const ref of selectores ) {
   if (ref.getAttribute('data-theme') === tema) {
    ref.classList.add('working');
    } else {
      ref.classList.remove('working');
    }

    }


}

}

