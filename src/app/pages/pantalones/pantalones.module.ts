import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

import { PantalonesPage } from './pantalones.page';
import { PantalonesPageRoutingModule } from './pantalones-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PantalonesPageRoutingModule
  ],
  declarations: [PantalonesPage]
})
export class PantalonesPageModule {}