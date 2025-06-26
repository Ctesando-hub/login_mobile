import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validator, Validators } from '@angular/forms';
import {IonicModule} from '@ionic/angular';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule, ReactiveFormsModule]
})
export class LoginPage {

  private fb=inject(FormBuilder)
  private auth=inject(AuthService)

    loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  })

  passwordVisible= false;
  login_error=false;
  mensajeError='';

  togglePassword() {
    this.passwordVisible = !this.passwordVisible
  }

  async onSubmit() {
    if(this.loginForm.valid) {
      const {email, password} = this.loginForm.value

      try {
        await this.auth.iniciarSesion(email!, password!)
      } catch (error: any) {
        this.login_error=true
        this.mensajeError = error.message || 'Error desconocido';
        console.log(error);

         // Ocultar mensaje de error después de 5 segundos
    setTimeout(() => {
      this.login_error = false;
      }, 5000);

      }
    }else {
      this.loginForm.markAllAsTouched();
      alert('Formualrio invalido')
    }
  }

  // Registrar usuario
  async registrar() {
    if(this.loginForm.valid) {
      const {email, password} = this.loginForm.value

      try {
        await this.auth.registrar(email!, password!)
      } catch (error: any) {
        alert('Error al intentar registrar: '+ error.message)
      }
    }
  }

  

}
