import { Component } from '@angular/core';
import { MenuController, NavController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent {
  constructor(
    private menu: MenuController, 
    private router: Router,
    private navCtrl: NavController
  ) {}

  async closeMenu() {
    console.log('Cerrando sesión...');
    localStorage.removeItem('username');
    localStorage.removeItem('usuarioActivo');
    await this.menu.close('mainMenu');
    this.navCtrl.navigateRoot(['/login'], { replaceUrl: true });
  }
}