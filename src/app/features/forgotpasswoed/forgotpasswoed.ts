import { Component, inject, signal } from '@angular/core';
import { AbstractControl, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/auth/auth-service';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-forgotpasswoed',
  styleUrl: './forgotpasswoed.css',
  templateUrl: './forgotpasswoed.html',
})
export class Forgotpasswoed {

  private fb = inject(FormBuilder)
  private _authService = inject(AuthService)
  private router = inject(Router)
  currentStep = signal<1 | 2 | 3>(1);

  goToStep(step: 1 | 2 | 3) {
    this.currentStep.set(step);
  }

  email = this.fb.group({
    email : ["" , [Validators.required , Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]]
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

  stepBack() {
    this.currentStep.update(step => (step - 1) as 1 | 2 | 3);
  }

  RestThePassword() {
    const payload = {
    email : this.email.value.email,
    newPassword : this.passwordForm.value.password
  } 
    this._authService.resetPassword(payload).subscribe({
    next:(res)=>{
      console.log(res);
      this.router.navigate(['/auth/login']);
    },
    error: (err) => {
      console.error(err)
      this.router.navigate(['/auth/login']);
    }
    });
  }
}