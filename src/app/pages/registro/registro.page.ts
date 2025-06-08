import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { FormatearFechaPipe } from 'src/app/pipes/formatear-fecha.pipe';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
  standalone: false
})
export class RegistroPage {
  nombre: string = '';
  apellido: string = '';
  usuario: string = '';
  password: string = '';
  fechaNacimiento: string = '';
  educacion: string = '';
  verPassword: boolean = false;

  constructor(
    private router: Router,
    private alertController: AlertController,
    private formatearFechaPipe: FormatearFechaPipe,
    private menu: MenuController
  ) {
    const nav = this.router.getCurrentNavigation();
    this.usuario = nav?.extras?.state?.['usuario'] || '';
  }

  ngOnInit (){this.menu.close("mainMenu")};

  async mostrarAlerta(mensaje: string) {
    const alert = await this.alertController.create({
      header: 'Validación',
      message: mensaje,
      buttons: ['OK'],
    });
    await alert.present();
  }

  // Función para validar y registrar
  async registrar() {
  const user = this.usuario.trim();
  const pass = this.password.trim();

  
    // para que nombre no pueda quedar vacío
  if (!this.nombre.trim()) {
    await this.mostrarAlerta('El campo de nombre no puede estar vacío.');
    return;
  }
  
  // para que apellido no pueda quedar vacío
  if (!this.apellido.trim()) {
    await this.mostrarAlerta('El campo de apellido no puede estar vacío.');
    return;
  }

    // para que usuario no pueda quedar vacío
  if (!user) {
    await this.mostrarAlerta('El campo de usuario no puede estar vacío.');
    return;
  }
  // para que contraseña no pueda quedar vacío
  if (!pass) {
    await this.mostrarAlerta('El campo de contraseña no puede estar vacío.');
    return;
  }

  // validar que la fecha de nacimiento no esté vacía
  if (!this.fechaNacimiento) {
    await this.mostrarAlerta('El campo de fecha de nacimiento no puede estar vacío.');
    return;
  }

    // para validar formatos
  if (!/^[a-zA-Z0-9]{3,8}$/.test(user)) {
    await this.mostrarAlerta('El usuario debe tener entre 3 y 8 caracteres alfanuméricos.');
    return;
  }

  if (!/^\d{4}$/.test(pass)) {
    await this.mostrarAlerta('La contraseña debe tener exactamente 4 dígitos numéricos.');
    return;
  }


  
  // si todo esta ok , se muestran los datos
  await this.mostrarDatos();
}

  // Solo muestra nombre, apellido y fecha formateada
  async mostrarDatos() {
    const fechaFormateada = this.formatearFechaPipe.transform(this.fechaNacimiento);

    const alert = await this.alertController.create({
      header: 'Usuario',
      message: `Su nombre es ${this.nombre} ${this.apellido} y su fecha de nacimiento es: ${fechaFormateada}`,
      buttons: ['OK']
    });

    await alert.present();
  }

  togglePasswordVisibility() {
    this.verPassword = !this.verPassword;
  }

  limpiarCampos() {
    this.nombre = '';
    this.apellido = '';
    this.usuario = '';
    this.password = '';
    this.educacion = '';
    this.fechaNacimiento = '';

    const campos = document.querySelectorAll('.animar-campo');
    campos.forEach((campo) => {
      campo.classList.remove('activar-animacion');
      void (campo as HTMLElement).offsetWidth;
      campo.classList.add('activar-animacion');

      setTimeout(() => {
        campo.classList.remove('activar-animacion');
      }, 1000);
    });
  }
}


