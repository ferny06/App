import { Component, OnInit } from '@angular/core';
import { ApiClientesService } from 'src/app/services/api-clientes.service';
import { MenuController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.page.html',
  styleUrls: ['./clientes.page.scss'],
  standalone: false
})
export class ClientesPage implements OnInit {

    users: any [] = [];
    nuevoUsuario = { name: '', username: '' };
  constructor(private apiService: ApiClientesService,
    private menu: MenuController, private alertController: AlertController
  ) { }

  ngOnInit() {
    this.menu.close("mainMenu");

    this.apiService.getUsers().subscribe(
      (data) => {
        this.users = data;
      },
      (error) => {
        this.mostrarAlerta(error);
      }
    )
  }

  // Función para agregar un nuevo usuario
   agregarUsuario() {
    this.apiService.addUser(this.nuevoUsuario).subscribe(
      (response) => {
        this.mostrarAlerta('Usuario agregado:'+ response); 
        this.users.push(response); // Agregar el nuevo usuario a la lista
        this.nuevoUsuario = { name: '', username: '' }; // Limpiar el formulario
      },
      (error) => {
        this.mostrarAlerta(error);
        //console.error('Error al agregar el usuario:', error);
      }
    );
  }

   // Método para mostrar alerta sobre el stock del producto
  async mostrarAlerta(mensaje:any) {
    const alert = await this.alertController.create({
      header: 'Mi app',
      message: mensaje,
      buttons: ['OK']
    });

    await alert.present();
  }

}
