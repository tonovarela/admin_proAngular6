import { MedicoService } from './medico/medico.service';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ModalUploadService } from '../components/modal-upload/modal-upload.service';
import { HospitalService } from './hospital/hospital.service';





import {
  SharedService,
  SidebarService,
  SettingsService,
  UsuarioService,
  SubirArchivoService,
  LoginGuardGuard,
  VerificaTokenGuard
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
    VerificaTokenGuard,
    SettingsService,
    ModalUploadService,
    HospitalService,
    MedicoService
  ],
  declarations: []
})
export class ServiceModule { }
