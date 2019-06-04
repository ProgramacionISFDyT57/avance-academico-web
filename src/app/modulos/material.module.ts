import {MatButtonModule, MatCheckboxModule, MatInputModule, MatCardModule, MatFormFieldModule, MatIconModule, MatToolbarModule, MatButtonToggleModule} from '@angular/material';
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
    MatIconModule,
    MatToolbarModule,
    MatButtonToggleModule
  ],exports: [
    MatButtonModule,
    MatCheckboxModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatListModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonToggleModule,
  ]
})
export class MaterialModule { }
