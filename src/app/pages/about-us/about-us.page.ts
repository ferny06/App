import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.page.html',
  styleUrls: ['./about-us.page.scss'],
  standalone: false
})
export class AboutUsPage implements OnInit {

  constructor(private menu: MenuController) { }

  ngOnInit() {this.menu.close("mainMenu")
  }

}
