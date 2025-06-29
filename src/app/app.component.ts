import { Component, OnInit } from '@angular/core';
import { MenuController, NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular'; // 👈 Agrega esto

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent implements OnInit { // 👈 Implementa OnInit
  constructor(
    private menu: MenuController,
    private router: Router,
    private navCtrl: NavController,
    private storage: Storage // 👈 Inyecta Storage
  ) {}

  // Inicializar Storage al iniciar la app
  async ngOnInit() {
    await this.storage.create();
  }

  // Cerrar sesión correctamente usando Storage
  async closeMenu() {
    console.log('Cerrando sesión...');
    await this.storage.remove('isLoggedIn'); // 👈 Esto ahora sí borra el estado de login
    await this.menu.close('mainMenu');
    this.navCtrl.navigateRoot(['/login'], { replaceUrl: true });
  }
}
