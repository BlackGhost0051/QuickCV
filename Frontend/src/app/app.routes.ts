import { Routes } from '@angular/router';
import {authGuard} from './services/auth.guard';

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
    path: 'login',
    loadComponent: () => import('./components/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'signup',
    loadComponent: () => import('./components/signup/signup.component').then(m => m.SignupComponent)
  },
  {
    path: 'admin',
    loadComponent: () => import('./components/admin/admin.component').then(m => m.AdminComponent)
  }
];

