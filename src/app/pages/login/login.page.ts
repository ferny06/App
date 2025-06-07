import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false
})
export class LoginPage  {

  usuario: string = '';
  password: string = '';

  constructor(private router: Router,
              private alertController: AlertController


  ) { }


  // Método para mostrar alerta de error
   async mostrarAlerta(mensaje: string) {
    const alert = await this.alertController.create({
      header: 'Error',
      message: mensaje,
      buttons: ['OK']
    });
    await alert.present();
  }

  

  login() {

    const user = this.usuario.trim();
    const pass = this.password.trim();
    
    // Verificar que el campo de usuario no esté vacío
    if (!this.usuario) {
      this.mostrarAlerta('El campo de usuario no puede estar vacío.');
      return;
    }

    // Verificar que la contraseña no esté vacía
    if (!this.password) {
      this.mostrarAlerta('El campo de contraseña no puede estar vacío.');
      return;
    }

     // Validar usuario que sea alfanumérico y entre 3 y 8 caracteres
    if (!/^[a-zA-Z0-9]{3,8}$/.test(user)) {
      this.mostrarAlerta('El usuario debe tener entre 3 y 8 caracteres alfanuméricos.');
      return;
    }

    // Validar contraseña de exactamente 4 dígitos numericos
    if (!/^\d{4}$/.test(pass)) {
      this.mostrarAlerta('La contraseña debe tener exactamente 4 dígitos numéricos.');
      return;
    }



    // Si todas las validaciones son correctas, navega a la página "home"
     this.router.navigate(['/home'], { state: { usuario: this.usuario } });
  }

    // para redirigir link de crea cuenta, como aun no hay pag creada, lo dejo como alerta
  irARegistro() {
  this.mostrarAlerta('Página sin habilitar.');
}

}
