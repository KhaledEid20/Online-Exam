import { Route } from '@angular/router';
import { Login } from './features/login/login';
import { Register } from './features/register/register';
import { Authpage } from './features/authpage/authpage';
import { Forgotpasswoed } from './features/forgotpasswoed/forgotpasswoed';

export const appRoutes: Route[] = [
    {path:'' ,redirectTo:'auth/login', pathMatch:'full'},
    { path: 'auth', component: Authpage , children:[
        {path: 'login' , component: Login , title:"Exam APP | Login"},
        {path: 'register' , component: Register , title:"Exam APP | Register"},
        {path: 'forgotPassword' , component: Forgotpasswoed , title:"Exam APP | forgotpassword"},
    ]},
];
