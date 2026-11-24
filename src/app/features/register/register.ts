import { Component, inject, signal, Signal } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgOtpInputComponent } from 'ng-otp-input';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { LucideChevronLeft } from '@lucide/angular';
import { MatInput } from '@angular/material/input';
import { AuthService } from '../../core/auth/auth-service';
import { HttpErrorResponse } from '@angular/common/http';
import { authError } from '../../core/auth/interfaces/login-response';

type step = 1 |2|3|4
@Component({
  imports: [MatFormField, MatInput, ReactiveFormsModule, NgOtpInputComponent, MatLabel, LucideChevronLeft],
  selector: 'app-register',
  styleUrl: './register.css',
  templateUrl: './register.html',
})
export class Register {

  private _authService = inject(AuthService)
  private fb = inject(FormBuilder)



  currentStep = signal<step>(1)
  // forms

  emailForm = this.fb.group({
    email : ["",[Validators.required , Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]]
  })

  otpForm = this.fb.group({
    otp:['', [Validators.required, Validators.pattern(/^\d{6}$/)]],
  })

  InfoFormal = this.fb.group({
    firstName : ['' , [Validators.required]],
    lastName : ['' , [Validators.required]],
    username : ['' , [Validators.required]],
    phone : ['' , [Validators.required]],
  })

  passwordForm = this.fb.group(
  {
    password: ['', [Validators.required, Validators.pattern(/^(?=.*[A-Z])(?=.*\d).{8,}$/)]],
    rePassword: ['', Validators.required],
  },
  { validators: this.passwordsMatch });



    private passwordsMatch(group: AbstractControl) {
    const p = group.get('password')?.value;
    const c = group.get('rePassword')?.value;
    return p === c ? null : { mismatch: true };
  }

  nextStep(form:FormGroup , num:step){
    if(form.invalid){
      form.markAllAsTouched();
      return;
    }
    this.currentStep.set(num);
  }


  CreateAccount(){
    if(this.passwordForm.invalid){
      this.passwordForm.markAllAsTouched();
      return;
    }
    const payload = {
      email : this.emailForm.value.email,
      ...this.InfoFormal.value,
      password : this.passwordForm.value.password,
      rePassword : this.passwordForm.value.rePassword
    }
    return this._authService.CreateAccount(payload).subscribe(
    {
      next:(res)=>{
        localStorage.setItem('token' , res.token);
        localStorage.setItem('UserInfo' , JSON.stringify(res.user));
        console.log("User Added")
      },
      error:(err:HttpErrorResponse)=>{
        const errorResponse = err.error as authError
        console.error(errorResponse)
      }
    }
  )
  }

  stepBack(){
    if(this.currentStep() === 1){
      return;
    }
    this.currentStep.update((s)=> (s-1) as 1 | 2 | 3)
    console.log("stepped back")
  }
}