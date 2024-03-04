import { Hero } from './../../interfaces/hero.interface';
import { Inject } from '@angular/core';
import { Component } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-confirm',
  templateUrl: './dialog-confirm.component.html',
  styles: ``
})
export class DialogConfirmComponent {

  constructor(
    public dialogRef: MatDialogRef<DialogConfirmComponent>,
    @Inject(MAT_DIALOG_DATA) public hero: Hero
  ){}

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  confirmClick(): void {
    this.dialogRef.close(true);
  }
    

}


