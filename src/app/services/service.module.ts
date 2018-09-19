
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';


import {
  SharedService,
  SidebarService,
  SettingsService,
  UsuarioService,
  SubirArchivoService,
  LoginGuardGuard
} from './service.index';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [ SharedService,
    SubirArchivoService,
    SidebarService,
    LoginGuardGuard,
    SettingsService],
  declarations: []
})
export class ServiceModule { }
