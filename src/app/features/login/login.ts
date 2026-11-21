import {Component} from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import { LucideX} from '@lucide/angular';


@Component({
  imports: [FormsModule, MatFormFieldModule, MatInputModule , LucideX],
  selector: 'app-login',
  styleUrl: './login.css',
  templateUrl: './login.html',
})
export class Login {
}
