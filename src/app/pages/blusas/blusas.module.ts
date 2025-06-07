import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

import { BlusasPage } from './blusas.page';
import { BlusasPageRoutingModule } from './blusas-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BlusasPageRoutingModule
  ],
  declarations: [BlusasPage]
})
export class BlusasPageModule {}