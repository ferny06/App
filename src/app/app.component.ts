import { Component } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent {
  constructor(private menu: MenuController) {}

  //método para cerrar menu
  closeMenu() {
    this.menu.close('mainMenu');
  }

  
}

