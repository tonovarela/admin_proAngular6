import { LoginGuardGuard } from './../services/guards/login-guard.guard';
import { RxjsComponent } from './rxjs/rxjs.component';
import { Routes, RouterModule, CanActivate } from '@angular/router';
import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesComponent } from './pages.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';


const pagesRoutes: Routes = [
 { path: '' , component: PagesComponent ,
    canActivate: [ LoginGuardGuard ],
  children: [
        { path: 'dashboard', component: DashboardComponent , data: {titulo: 'Dashboard' }},
        { path: 'progress', component: ProgressComponent, data: {titulo: 'Progress' }},
        { path: 'grafica1', component: Grafica1Component, data: {titulo: 'Gráficas' }},
        { path: 'account-settings', component: AccountSettingsComponent, data: {titulo: 'Ajustes del tema' }},
        { path: 'promesas', component: PromesasComponent, data: {titulo: 'Promesas' }},
        { path: 'rjx', component: RxjsComponent , data: {titulo: 'RxJs' }},
        { path: '', redirectTo: '/dashboard', pathMatch: 'full'}
    ]}
];
export const PAGESROUTES = RouterModule.forChild(pagesRoutes);
