import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorNofoundPageComponent } from './pages/error-nofound-page/error-nofound-page.component';



@NgModule({
  declarations: [
    ErrorNofoundPageComponent
  ],
  imports: [
    CommonModule
  ], 
  exports: [
    ErrorNofoundPageComponent
  ]
})
export class SharedModule { }
