import {MatButtonModule, MatCheckboxModule, MatInputModule, MatCardModule, MatFormFieldModule} from '@angular/material';
import { NgModule } from '@angular/core';
import {MatCardModule} from '@angular/material/card';


@NgModule({
  imports: [
    MatButtonModule,
    MatCheckboxModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule
  ],exports: [
    MatButtonModule,
    MatCheckboxModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule
  ]
})
export class MaterialModule { }
