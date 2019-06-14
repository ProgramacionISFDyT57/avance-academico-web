import {MatButtonModule, MatCheckboxModule, MatInputModule, MatCardModule, MatFormFieldModule, MatIconModule, MatToolbarModule, MatButtonToggleModule} from '@angular/material';
import { NgModule } from '@angular/core';
import {MatListModule} from '@angular/material/list';
import {MatSelectModule} from '@angular/material/select';


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
    MatButtonToggleModule,
    MatSelectModule,

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
    MatSelectModule
  ]
})
export class MaterialModule { }
