import { Component } from '@angular/core';
// import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PlayerSnackbarComponent } from '../player-snackbar/player-snackbar.component';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css'],
})
export class DialogComponent {
  durationInSeconds: number = 5;
  // constructor(public data: any) {}
  constructor(private _snackBar: MatSnackBar) {}

  openSnackBar() {
    this._snackBar.openFromComponent(PlayerSnackbarComponent, {
      duration: this.durationInSeconds * 1000,
    });
  }
}
