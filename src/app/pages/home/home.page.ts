import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {
  usuario: string='';
  nombre: string='';
  apellido: string='';
  educacion: string='';
  fechaNacimiento: string='';

  constructor(private router: Router,
    private alertController: AlertController
  ) {
    const nav = this.router.getCurrentNavigation();
    this.usuario = nav?.extras?.state?.['usuario'] || '';

}
// Muestra los datos en una alerta
async mostrarDatos() {
  const alert = await this.alertController.create({
    header: 'Usuario',
    message: `Su nombre es ${this.nombre} ${this.apellido}`,
    buttons: ['Yes']
  });
  await alert.present();
}



  // Limpia todos los campos y aplica animación
  limpiarCampos() {
    this.nombre = '';
    this.apellido = '';
    this.educacion = '';
    this.fechaNacimiento = '';

    const campos = document.querySelectorAll('.animar-campo');
    campos.forEach((campo) => {
    campo.classList.remove('activar-animacion');
    void (campo as HTMLElement).offsetWidth; // <- reinicia animación
    campo.classList.add('activar-animacion');

    setTimeout(() => {
      campo.classList.remove('activar-animacion');
    }, 1000);
  });
}
  
}

