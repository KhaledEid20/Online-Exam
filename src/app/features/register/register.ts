import { Component, inject, signal, Signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgOtpInputComponent } from 'ng-otp-input';
import { MatFormField, MatLabel } from '@angular/material/form-field';

@Component({
  imports: [MatFormField, ReactiveFormsModule, NgOtpInputComponent, MatLabel],
  selector: 'app-register',
  styleUrl: './register.css',
  templateUrl: './register.html',
})
export class Register {

  private fb = inject(FormBuilder)


  currentStep = signal<1|2|3|4>(3)

  // forms

  emailForm = this.fb.group({
    email : ["",[Validators.required , Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]]
  })

  otpForm = this.fb.group({
    otp:['', [Validators.required, Validators.pattern(/^\d{6}$/)]],
  })



}