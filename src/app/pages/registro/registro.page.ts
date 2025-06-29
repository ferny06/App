import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { FormatearFechaPipe } from 'src/app/pipes/formatear-fecha.pipe';
import { MenuController } from '@ionic/angular';
import { BaseDeDatosService } from 'src/app/services/base-de-datos.service';

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
    private menu: MenuController,
    private baseDeDatosService: BaseDeDatosService
  ) {
    const nav = this.router.getCurrentNavigation();
    this.usuario = nav?.extras?.state?.['usuario'] || '';
  }

  ngOnInit() {
    this.menu.close("mainMenu");
  }

  async mostrarAlerta(mensaje: string) {
    const alert = await this.alertController.create({
      header: 'Validación',
      message: mensaje,
      buttons: ['OK'],
    });
    await alert.present();
  }

  async registrar() {
    const user = this.usuario.trim();
    const pass = this.password.trim();

    // validaciones
    if (!this.nombre.trim()) {
      await this.mostrarAlerta('El campo de nombre no puede estar vacío.');
      return;
    }

    if (!this.apellido.trim()) {
      await this.mostrarAlerta('El campo de apellido no puede estar vacío.');
      return;
    }

    if (!user) {
      await this.mostrarAlerta('El campo de usuario no puede estar vacío.');
      return;
    }

    if (!pass) {
      await this.mostrarAlerta('El campo de contraseña no puede estar vacío.');
      return;
    }

    if (!this.fechaNacimiento) {
      await this.mostrarAlerta('El campo de fecha de nacimiento no puede estar vacío.');
      return;
    }

    if (!/^[a-zA-Z0-9]{3,8}$/.test(user)) {
      await this.mostrarAlerta('El usuario debe tener entre 3 y 8 caracteres alfanuméricos.');
      return;
    }

    if (!/^\d{4}$/.test(pass)) {
      await this.mostrarAlerta('La contraseña debe tener exactamente 4 dígitos numéricos.');
      return;
    }

    try {
      const registroExitoso = await this.baseDeDatosService.registerUser(
        this.nombre,
        this.apellido,
        user,
        pass,
        this.educacion,
        this.fechaNacimiento
      );

      if (registroExitoso) {
        await this.mostrarDatos();
        this.router.navigate(['/login'], {
          state: { usuario: this.usuario }
        });
      } else {
        await this.mostrarAlerta('No se pudo completar el registro. El nombre de usuario podría estar en uso.');
      }
    } catch (error) {
      console.error('Error en el registro:', error);
      await this.mostrarAlerta('Ocurrió un error al intentar registrar el usuario.');
    }
  }

  async mostrarDatos() {
    const fechaFormateada = this.formatearFechaPipe.transform(this.fechaNacimiento);
    const mensaje = `¡Registro exitoso!
                   Nombre: ${this.nombre} ${this.apellido}
                   Usuario: ${this.usuario}
                   Fecha de nacimiento: ${fechaFormateada}
                   Ahora podrás iniciar sesión :)`;

    const alert = await this.alertController.create({
      header: '¡Registro Exitoso!',
      message: mensaje,
      buttons: ['Aceptar']
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