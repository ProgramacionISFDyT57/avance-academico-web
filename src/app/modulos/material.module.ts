import {MatButtonModule, MatCheckboxModule, MatInputModule, MatCardModule, MatFormFieldModule, MatIconModule} from '@angular/material';
import { NgModule } from '@angular/core';
import {MatListModule} from '@angular/material/list';


@NgModule({
  imports: [
    MatButtonModule,
    MatCheckboxModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatListModule,
    MatIconModule
  ],exports: [
    MatButtonModule,
    MatCheckboxModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatListModule,
    MatIconModule
  ]
})
export class MaterialModule { }
