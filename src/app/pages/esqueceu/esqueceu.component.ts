import { Component } from '@angular/core';

@Component({
  selector: 'app-esqueceu',
  templateUrl: './esqueceu.component.html',
  styleUrl: './esqueceu.component.scss'
})
export class EsqueceuComponent {

    email: string ='';
    password: string='';
    confirmPassword: string='';
    isPasswordVisible: boolean = false;

    togglePasswordVisibility() {
        this.isPasswordVisible = !this.isPasswordVisible;
    }

    onSubmit() {

    }
}

