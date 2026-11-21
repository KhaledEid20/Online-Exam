import { Route } from '@angular/router';
import { Login } from './features/login/login';
import { Register } from './features/register/register';
import { Authpage } from './features/authpage/authpage';

export const appRoutes: Route[] = [
    {path:'' , component: Authpage},
    { path: 'auth', component: Authpage , children:[
        {path: 'login' , component: Login},
        {path: 'register' , component: Register},
    ]},
];
