import { Component } from '@angular/core';

interface Producto {
  
  nombre: string;
  precio: number;
  imagen: string;
}

@Component({
  selector: 'app-pantalones',
  templateUrl: './pantalones.page.html',
  styleUrls: ['./pantalones.page.scss'],
  standalone: false
})
export class PantalonesPage {
  productos = [
    { nombre: 'Pantalón cotelé', precio: 24990, imagen: 'assets/img/imgpantalones/pant3.jpg' },
    { nombre: 'Jeans doble textura', precio: 15990, imagen: 'assets/img/imgpantalones/pant7.jpg' },
    { nombre: 'Jeans ancho', precio: 25990, imagen: 'assets/img/imgpantalones/pant8.jpg' }
  ];

  constructor() {}
}