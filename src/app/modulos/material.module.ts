import {MatButtonModule, MatCheckboxModule} from '@angular/material';
import { NgModule } from '@angular/core';
import {MatCardModule} from '@angular/material/card';


@NgModule({
  imports: [
    MatButtonModule,
    MatCheckboxModule,
    MatCardModule
  ],
  exports:[
    MatButtonModule,
    MatCheckboxModule,
    MatCardModule
  ]

})
export class MaterialModule { }
