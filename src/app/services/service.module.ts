
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ModalUploadService } from '../components/modal-upload/modal-upload.service';



import {
  SharedService,
  SidebarService,
  SettingsService,
  UsuarioService,
  SubirArchivoService,
  LoginGuardGuard,
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
    SettingsService,
   ModalUploadService],
  declarations: []
})
export class ServiceModule { }
