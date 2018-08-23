import { PAGESROUTES } from './pages.routes';
import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';
import { ProgressComponent } from './progress/progress.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Grafica1Component } from './grafica1/grafica1.component';

import { SharedModule } from '../shared/shared.module';


@NgModule({
declarations: [
    PagesComponent,
    DashboardComponent,
    ProgressComponent,
    Grafica1Component
],
exports: [
    PagesComponent,
    DashboardComponent,
    ProgressComponent,
    Grafica1Component
],
imports: [
    SharedModule,
    PAGESROUTES
]
})
export class PagesModule { }
