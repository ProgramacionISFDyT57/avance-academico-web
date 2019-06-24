import {
  MatButtonModule, MatCheckboxModule, MatInputModule,
  MatCardModule, MatFormFieldModule, MatIconModule,
  MatToolbarModule, MatButtonToggleModule, MatNativeDateModule
} from '@angular/material';
import { NgModule } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatDatepickerModule} from '@angular/material/datepicker';

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
    MatProgressBarModule,
    MatTooltipModule,
    MatDatepickerModule,
    MatNativeDateModule
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
    MatSelectModule,
    MatProgressBarModule,
    MatTooltipModule,
    MatDatepickerModule,
    MatNativeDateModule
  ]
})
export class MaterialModule { }
