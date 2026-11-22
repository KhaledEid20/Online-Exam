import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../Environments/environment';
import { LoginResponse } from './interfaces/login-response';

@Service()
export class AuthService {
    private _context = inject(HttpClient)

    Login(data : any): Observable<LoginResponse> {
        return this._context.post<LoginResponse>(`${environment.baseUrl}/auth/signin`, data);
    }
}
