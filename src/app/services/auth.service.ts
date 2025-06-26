import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { createUserWithEmailAndPassword, onAuthStateChanged,sendEmailVerification, signInWithEmailAndPassword, signOut, User } from 'firebase/auth';
import { Auth } from '@angular/fire/auth';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private usuarioActual: User | null = null;

  constructor(private auth: Auth, private router: Router) {
    onAuthStateChanged(this.auth, (usuario) => this.usuarioActual= usuario)
  }
  async registrar(email: string, password:string){
    const cred = await createUserWithEmailAndPassword(this.auth, email, password);
    await sendEmailVerification(cred.user);
    await signOut(this.auth);
    alert('Verifica tu correo electronico antes de iniciar sesion');
  }

  async iniciarSesion(email: string, password: string) {
    const cred = await signInWithEmailAndPassword(this.auth, email, password);
    if(!cred.user.emailVerified) {
      await signOut(this.auth);
      throw new Error('Correo no verificado');
    }
    this.router.navigate(['/home'])
  }
  
  async cerrarSesion() {
    await signOut(this.auth);
    this.router.navigate(['/login'])
  }

  estaLogueado():boolean {
    return !!this.usuarioActual && this.usuarioActual.emailVerified
  }
}
