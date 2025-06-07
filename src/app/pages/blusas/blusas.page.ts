import { Component } from '@angular/core';

interface Producto {
  
  nombre: string;
  precio: number;
  imagen: string;
}

@Component({
  selector: 'app-blusas',
  templateUrl: './blusas.page.html',
  styleUrls: ['./blusas.page.scss'],
  standalone: false
})
export class BlusasPage {
  productos = [
    { nombre: 'Blusa cuadrille', precio: 10990, imagen: 'assets/img/imgblusas/bl6.jpg' },
    { nombre: 'Blusa holographic', precio: 15990, imagen: 'assets/img/imgblusas/blu3.jpg' },
    { nombre: 'Blusa mariposa', precio: 9990, imagen: 'assets/img/imgblusas/blu9.jpg' }
  ];

  constructor() {}
}