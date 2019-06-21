import {
  MatButtonModule, MatCheckboxModule, MatInputModule,
  MatCardModule, MatFormFieldModule, MatIconModule,
  MatToolbarModule, MatButtonToggleModule
} from '@angular/material';
import { NgModule } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressBarModule } from '@angular/material/progress-bar';

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
    MatSelectModule
    MatProgressBarModule
  ], exports: [
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
    MatProgressBarModule
  ]
})
export class MaterialModule { }
