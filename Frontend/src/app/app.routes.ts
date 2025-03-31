import { Routes } from '@angular/router';
import {authGuard} from './services/auth.guard';
import {adminGuard} from './services/admin.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./components/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'generator',
    loadComponent: () => import('./components/cv-generator/cv-generator.component').then(m => m.CvGeneratorComponent),
    canActivate: [authGuard]
  },
  {
    path: 'form/:id',
    loadComponent: () => import('./components/cv-form/cv-form.component').then(m => m.CvFormComponent),
    canActivate: [authGuard]
  },
  {
    path: 'login',
    loadComponent: () => import('./components/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'signup',
    loadComponent: () => import('./components/signup/signup.component').then(m => m.SignupComponent)
  },
  {
    path: 'statistics',
    loadComponent: () => import('./components/cv-statistics/cv-statistics.component').then(m => m.CvStatisticsComponent),
    canActivate: [authGuard]
  },
  {
    path: 'admin',
    loadComponent: () => import('./components/admin/admin.component').then(m => m.AdminComponent),
    canActivate: [adminGuard]
  },
  {
    path: 'change-password',
    loadComponent: () => import('./components/change-password/change-password.component').then(m => m.ChangePasswordComponent),
    canActivate: [authGuard]
  }
];

