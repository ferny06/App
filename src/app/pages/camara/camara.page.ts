import { Component, OnInit } from '@angular/core';
import {Camera, CameraResultType, CameraSource} from '@capacitor/camera';
import { MenuController } from '@ionic/angular';



@Component({
  selector: 'app-camara',
  templateUrl: './camara.page.html',
  styleUrls: ['./camara.page.scss'],
  standalone: false
})
export class CamaraPage implements OnInit {
  capturedImage: string | undefined;

  constructor(private menu: MenuController) { }

  ngOnInit() {
    this.menu.close("mainMenu");
  }

  async captureImage() {
    try {
      const image = await Camera.getPhoto({
        quality: 90,                          // calidad
        resultType: CameraResultType.DataUrl, // formato url
        source: CameraSource.Camera,   // fuente
        allowEditing: true // para permitir editar foto
      });

      this.capturedImage = image.dataUrl; 
    } catch (error) {
      alert('Error al capturar imagen:'+' - '+ error);
    }
  }

}
