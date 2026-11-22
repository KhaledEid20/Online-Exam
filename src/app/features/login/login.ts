import {Component, inject} from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import { LucideX} from '@lucide/angular';
import { AuthService } from '../../core/auth/auth-service';
import { Subscription } from 'rxjs';
import { RouterLink } from '@angular/router';


@Component({
  imports: [FormsModule, MatFormFieldModule, MatInputModule, LucideX, ReactiveFormsModule , RouterLink],
  selector: 'app-login',
  styleUrl: './login.css',
  templateUrl: './login.html',
})
export class Login {

  private _authService = inject(AuthService)
  private $loginSub! : Subscription
  private fb = inject(FormBuilder)
  loginForm = this.fb.group({
    email:["" , [Validators.required , Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]],
    password : ["" , [Validators.required , Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{8,}$/)]]
  })

submit(){
  if(this.loginForm.invalid){
    this.loginForm.markAllAsTouched();
    return;
  }
  this.$loginSub = this._authService.Login(this.loginForm.value).subscribe(
    (res)=>{
      console.log("login Succeeded")
      this.loginForm.reset();
      this.loginForm.markAsUntouched();
      localStorage.setItem('token' , res.token);
      localStorage.setItem('UserInfo' , JSON.stringify(res.user));
    },
    (error) => {
      console.error('Login failed:', error.message);
    }
)
}
}