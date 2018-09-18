import { Injectable } from '@angular/core';
import { CanActivate} from '@angular/router';
import { UsuarioService } from '../usuario/usuario.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginGuardGuard implements CanActivate {



  constructor(public router: Router,
    public _usuarioService: UsuarioService) {

  }
  canActivate(): boolean {
    if (this._usuarioService.estaLoguedo()) {
      console.log('Paso el guard');
      return true;
    } else {
      console.log('bloqueado por el guard');
      this.router.navigate(['/login']);
      return false;
    }

  }
}
