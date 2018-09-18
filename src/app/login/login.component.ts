import { Component, OnInit, enableProdMode } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../services/service.index';
import { Usuario } from '../models/usuario.model';

declare function iniciar_plugins();
declare const gapi: any;


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string;
  recuerdame: boolean = false;
  auth2: any;
  constructor(public router: Router, public _usuarioService: UsuarioService) {}

  ngOnInit() {
    iniciar_plugins();
    this.googleInit();
    this.email = localStorage.getItem('email') || '';
    if (this.email.length > 1) {
      this.recuerdame = true;
      console.log(this.email);
        console.log('recuerdame');
    } else {
      console.log('NOpppp');
    }
  }

  googleInit() {
    gapi.load('auth2', () => {
    this.auth2 = gapi.auth2.init({
     client_id: '696338438250-cm03f8fem8i22vv4hlgo9p0m5q8let98.apps.googleusercontent.com',
     cookiepolicy: 'single_host_origin',
     scope: 'profile email'
    });
    this.attachSignin(document.getElementById('btnGoogle'));
    });
  }


  attachSignin (element) {
    this.auth2.attachClickHandler( element, {}, googleUser => {
      // const profile = googleUser.getBasicProfile();
      const token = googleUser.getAuthResponse().id_token;
      // console.log( token );
      this._usuarioService.loginGoogle(token).subscribe(resp => window.location.href = '#/dashboard' );
    });
  }
  ingresar(form: NgForm) {
    const usuario = new Usuario(null, form.value.email, form.value.password);
    this._usuarioService
      .login(usuario, form.value.recuerdame)
      .subscribe(resp => this.router.navigate(['/dashboard']));
    // this.router.navigate(['/dashboard']);
  }
}
