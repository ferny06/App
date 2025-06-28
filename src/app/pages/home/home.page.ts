import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { MenuController } from '@ionic/angular';

export interface ProductoRopa {
  nombre: string;
  precio: number;
  imagenUrl: string;
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false
})
export class HomePage implements OnInit {
  usuario: string = '';
  
  productosDeRopa: ProductoRopa[] = [
    {
      nombre: 'Jeans desteñidos wide leg',
      precio: 19990,
      imagenUrl: 'assets/img/imghome/img2.jpg',
    },
    {
      nombre: 'Chaleco cuello alto',
      precio: 34990,
      imagenUrl: 'assets/img/imghome/img1.jpg', 
    },
    {
      nombre: 'Chaqueta oversize',
      precio: 34990,
      imagenUrl: 'assets/img/imghome/img8.jpg', 
    },
    {
      nombre: 'Camiseta cuello alto',
      precio: 34990,
      imagenUrl: 'assets/img/imghome/img12.jpg', 
    },
  ];

  constructor(
    private router: Router,
    private menu: MenuController
  ) {
    const storedUser = localStorage.getItem('usuarioActivo');
    if (!storedUser) {
      this.router.navigate(['/login']);
    } else {
    this.usuario = storedUser;
    }
  }

  ngOnInit() {
    this.menu.close("mainMenu");
  }
}