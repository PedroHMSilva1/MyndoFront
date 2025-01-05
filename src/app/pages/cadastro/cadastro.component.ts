import { Component } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.scss'
})
export class CadastroComponent {
  user: string = '';
  email: string = '';
  pass: string = '';
  confirmPass: string = '';
  isPasswordVisible: boolean = false;
  isConfirmPasswordVisible: boolean = false;
  constructor(private service: UsuarioService,  private router: Router){

  }
  onSubmit() {
    if (this.isFormValid() && this.isPasswordEqual()) {
      this.service.cadastrar({nome: this.user, email: this.email.toLowerCase(), senha: this.pass, dataCadastro:new Date().toISOString().split('.')[0]})
        .subscribe((res) => {
          this.router.navigate(['/login'])
        }, (err) => {

          if(err.error.cause.cause.message.includes('Duplicate entry')){

            alert("Email já foi cadastrado")
          }
          else
            alert("Erro ao tentar cadastrar.")
        })
      
    }
  }

  isFormValid(): boolean {
    return (this.pass != '' && this.email != '' && this.user != '')
  }
  isPasswordEqual(): boolean{
    return (this.pass === this.confirmPass)
  }

  togglePasswordVisibility() {
    this.isPasswordVisible = !this.isPasswordVisible;
    this.animateIcon('show-password');
  }

  toggleConfirmPasswordVisibility() {
    this.isConfirmPasswordVisible = !this.isConfirmPasswordVisible;
    this.animateIcon('show-confirm-password');
  }

  private animateIcon(iconId: string) {
    const showPasswordIcon = document.getElementById(iconId);
    if (showPasswordIcon) {
      showPasswordIcon.classList.add('blinking');

      setTimeout(() => {
        showPasswordIcon.classList.remove('blinking');
      }, 1000);
    }
  }
}