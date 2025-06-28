import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
import { BaseDeDatosService } from 'src/app/services/base-de-datos.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false
})
export class LoginPage {
  usuario: string = '';
  password: string = '';

  constructor(
    private router: Router,
    private alertController: AlertController,
    private baseDeDatosService: BaseDeDatosService,
    private navCtrl: NavController
  ) { }

  async mostrarAlerta(mensaje: string) {
    const alert = await this.alertController.create({
      header: 'Error',
      message: mensaje,
      buttons: ['OK']
    });
    await alert.present();
  }

  async login() {
    const user = this.usuario.trim();
    const pass = this.password.trim();
    
    if (!user) {
      await this.mostrarAlerta('El campo de usuario no puede estar vacío');
      return;
    }

    if (!pass) {
      await this.mostrarAlerta('El campo de contraseña no puede estar vacío');
      return;
    }

    if (!/^[a-zA-Z0-9]{3,8}$/.test(user)) {
      await this.mostrarAlerta('El usuario debe tener entre 3 y 8 caracteres alfanuméricos');
      return;
    }

    if (!/^\d{4}$/.test(pass)) {
      await this.mostrarAlerta('La contraseña debe tener 4 dígitos numéricos');
      return;
    }

  try {
    console.log('Iniciando sesión...', { user });
    const isAuthenticated = await this.baseDeDatosService.loginUser(user, pass);
    
    if (isAuthenticated) {
      console.log('Autenticación exitosa');
      localStorage.setItem('usuarioActivo', user);
      this.navCtrl.navigateRoot(['/home'], { replaceUrl: true });
    } else {
      await this.mostrarAlerta('Usuario o contraseña incorrectos.');
    }
  } catch (error) {
    console.error('Error en login:', error);
    await this.mostrarAlerta('Error al conectar con la base de datos. Intente nuevamente.');
  }
  }

  irARegistro() {
    this.router.navigate(['/registro']);
  }
}