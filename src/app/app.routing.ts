import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { RegisterComponent } from './register';
import { AuthGuard } from './_guards';
import { AuditsComponent } from './Audits/Audits.components';
import { DashboardComponent } from './dashboard/dashboard.component';

// const appRoutes: Routes = [
//     { path: 'home', component: HomeComponent, canActivate: [AuthGuard],children:[
//         { path: 'dashboard', component: DashboardComponent,  },
//         { path: 'audits', component: AuditsComponent, },
//     ] },
  
//     {path:'',pathMatch:'full',redirectTo:'login'},
//     { path: 'login', component: LoginComponent },
//     { path: 'register', component: RegisterComponent },

//     // otherwise redirect to home
//     { path: '**', redirectTo: 'login' }
// ];

const appRoutes: Routes = [
    {
    path:'',
    redirectTo:'login',
    pathMatch:'full'
  },
  {
    path:'login',
    component:LoginComponent
  },
  { path: 'register', component: RegisterComponent },
  {
    path:'home',
    component:HomeComponent,
    children:[{

      path:'dashboard',
      component:DashboardComponent
    },
    {
      path:'audits',
      component:AuditsComponent
  }
  ]
  }
  ];
export const routing = RouterModule.forRoot(appRoutes);