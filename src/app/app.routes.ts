import { PagesComponent } from './pages/pages.component';
import { Grafica1Component } from './pages/grafica1/grafica1.component';
import { Routes , RouterModule} from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './login/register.component';
import { ProgressComponent } from './pages/progress/progress.component';
import { NopagefoundComponent } from './shared/nopagefound/nopagefound.component';



const appRoutes: Routes = [
    { path: '' , component: PagesComponent , children: [
        { path: 'dashboard', component: DashboardComponent},
        { path: 'progress', component: ProgressComponent},
        { path: 'grafica1', component: Grafica1Component},
        { path: '', redirectTo: '/dashboard', pathMatch: 'full'}
    ]},
    { path: 'login' , component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: '*', component: NopagefoundComponent}

];

export const APP_ROUTES = RouterModule.forRoot(appRoutes, { useHash: true } );
